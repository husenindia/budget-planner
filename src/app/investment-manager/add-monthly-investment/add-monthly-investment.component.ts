import { Component } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryModal, MonthlyInvestmentModal } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 

@Component({
  selector: 'app-add-monthly-investment',
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
  templateUrl: './add-monthly-investment.component.html',
  styleUrl: './add-monthly-investment.component.scss'
})
export class AddMonthlyInvestmentComponent {
  transactionForm!: FormGroup;
  allTransactions$!: Observable<MonthlyInvestmentModal[]>;
  categories$!: Observable<CategoryModal[]>;
  filteredCategory: CategoryModal | undefined;
  transactionId: string | null = null;
  collectionTransaction = 'MonthlyInvestment';
  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formInit(); 
    this.categories$ = this.transactionService.getAllRecords('InvestmentCategory', 'categoryId');
    if (this.transactionId) {      
      this.loadTransaction(this.transactionId);
    } else {
      const startDateControl = this.transactionForm.get('startDate');
      if(startDateControl){
        this.subscriptions.push(startDateControl.valueChanges.subscribe(value => {
          this.transactionForm.get('lastProcessedDate')?.setValue(value, { emitEvent: false });
        }));
      }
    }
  }

  async loadTransaction(id: string) {    
      const snapshot = await this.transactionService.getRecordById(this.collectionTransaction, id);
      if (snapshot.exists()) {
        const data =  snapshot.data() as  MonthlyInvestmentModal;
        const transactionDate = this.transactionService.formatDate(data.startDate);
        const dataWithFormattedDate = {
          ...data,
          startDate: new Date(transactionDate),
        }
        this.transactionForm.patchValue(dataWithFormattedDate);
      }
  }


  formInit() {
    this.transactionForm = this.fb.group({
      cause: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      amount: this.fb.control(0, { nonNullable: true, validators: [Validators.required]}),
      categoryId: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      expectedReturn: this.fb.control (0, { nonNullable: true, validators: [Validators.required]}),
      startDate: this.fb.control ((new Date()), { nonNullable: true, validators: [Validators.required]}),
      lastProcessedDate: this.fb.control ((new Date()), { nonNullable: true, validators: [Validators.required]}),
    });
  }

  

  onSubmit(): void {    
    if (this.transactionForm.valid) {      
      const transactionLog: MonthlyInvestmentModal = this.transactionForm.getRawValue();
      this.subscriptions.push(this.categories$.subscribe(categories => {              
        const selectedCat = categories.find(c => c.categoryId === transactionLog.categoryId);
        const data: MonthlyInvestmentModal = {
            ...transactionLog,
            categoryName: selectedCat ? selectedCat.name : ''
        }
        if(this.transactionId) { // EDIT
          this.transactionService.updateRecord(this.collectionTransaction, this.transactionId, data);
        }
        else { // ADD
          this.transactionService.addRecord(this.collectionTransaction, data);
        }
        this.router.navigate(['/investment-manager/monthly-investment-list']);
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


}
