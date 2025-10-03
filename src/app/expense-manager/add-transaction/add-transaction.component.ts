import { Component } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryModal, TransactionLogModal } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  transactionForm!: FormGroup;
  allTransactions$!: Observable<TransactionLogModal[]>;
  categories$!: Observable<CategoryModal[]>;
  transactionId: string | null = null;
  collectionTransaction = 'TransactionLog';
  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formInit(); 
    this.categories$ = this.transactionService.getAllRecords('Category', 'categoryId');
    if (this.transactionId) {      
      this.loadTransaction(this.transactionId);
    }  

  }

  async loadTransaction(id: string) {    
    const snapshot = await this.transactionService.getRecordById(this.collectionTransaction, id);
    if (snapshot.exists()) {
      const data =  snapshot.data() as  TransactionLogModal;
      const transactionDate = this.transactionService.formatDate(data.date);
      const dataWithFormattedDate = {
        ...data,
        date: new Date(transactionDate),
      }
      console.log(dataWithFormattedDate);
      this.transactionForm.patchValue(dataWithFormattedDate);
    }
  }

  formInit() {
    this.transactionForm = this.fb.group({
      cause: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      amount: this.fb.control(0, { nonNullable: true, validators: [Validators.required]}),
      categoryId: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      transactionType: this.fb.control(false, {nonNullable: true}),
      date: this.fb.control ((new Date()), { nonNullable: true, validators: [Validators.required]})
    });
    console.log(this.transactionForm.value.date);

  }

  onSubmit(): void {    
    console.log('Transaction form submitted');   
    if (this.transactionForm.valid) {      
      const transactionLog: TransactionLogModal = this.transactionForm.getRawValue();
      this.subscriptions.push(this.categories$.subscribe(categories => {              
        const selectedCat = categories.find(c => c.categoryId === transactionLog.categoryId);
        const data: TransactionLogModal = {
            ...transactionLog,
            categoryName: selectedCat ? selectedCat.name : ''
        }
        if(this.transactionId) { // EDIT
          this.transactionService.updateRecord(this.collectionTransaction, this.transactionId, data);
        }
        else { // ADD
          this.transactionService.addRecord(this.collectionTransaction, data);
        }
        this.router.navigate(['/expense-manager/transaction-list']);
        this.transactionForm.reset();
        this.transactionForm.markAsPristine();
      }));
      
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  get form() {
    return this.transactionForm.controls;
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to prevent memory leaks
    if (this.subscriptions.length>0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}  // Unsubscribe when the component is destroyed to prevent memory leaks
  
