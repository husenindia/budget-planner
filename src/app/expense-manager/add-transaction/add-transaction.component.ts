import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Category, TransactionLog } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent {
  transactionForm!: FormGroup;
  allTransactions$!: Observable<TransactionLog[]>;
  categories$!: Observable<Category[]>;
  transactionId: string | null = null;
  collectionTransaction = 'TransactionLog';
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private firestore: Firestore, private transactionService: TransactionService) {}

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
      this.transactionForm.patchValue(snapshot.data() as TransactionLog);
    }
  }

  formInit() {
    this.transactionForm = this.fb.group({
      cause: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      amount: this.fb.control(0, { nonNullable: true, validators: [Validators.required]}),
      categoryId: this.fb.control('', { nonNullable: true, validators: [Validators.required]}),
      transactionType: this.fb.control(false, {nonNullable: true})
    });
  }

  onSubmit(): void {    
    if (this.transactionForm.valid) {      
      const transactionLog: TransactionLog = this.transactionForm.getRawValue();
      this.categories$.subscribe(categories => {              
        const selectedCat = categories.find(c => c.categoryId === transactionLog.categoryId);
        const data: TransactionLog = {
            ...transactionLog,
            categoryName: selectedCat ? selectedCat.name : '',
            date: new Date()            
        }
        if(this.transactionId) { // EDIT
          this.transactionService.updateRecord(this.collectionTransaction, this.transactionId, data);
        }
        else { // ADD
          this.transactionService.addRecord(this.collectionTransaction, data);
        }
        this.transactionForm.reset();
        this.transactionForm.markAsPristine();
      });
      
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  get form() {
    return this.transactionForm.controls;
  }
}
