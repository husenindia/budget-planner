import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionLog } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface TransactionLogWithFormattedDate extends TransactionLog {
  formattedDate: string | null; // Add formattedDate as a string or null
}
@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.scss',
  providers: [DatePipe]
})
export class ListTransactionComponent {
  allTransactions$!: Observable<TransactionLogWithFormattedDate[]>;
  collectionName = 'TransactionLog';
  collectionId  = 'transactionId';
  constructor(private fb: FormBuilder, private transactionService: TransactionService, private datePipe: DatePipe) {}
  ngOnInit() {
    this.allTransactions$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId).pipe(
      map(transactions=> 
        transactions.map(transaction => ({
          ...transaction,
          formattedDate: this.formatDate(transaction.date) // Convert and format the date
        })) 
      )
    );
  }
  // Method to handle both Date and Timestamp
  formatDate(date: Date | Timestamp): string | null {
    if (date instanceof Timestamp) {
      // If date is a Firestore Timestamp, convert it to Date
      console.log(this.datePipe.transform(date.toDate(), 'dd/MM/yyyy'));
      return this.datePipe.transform(date.toDate(), 'dd/MM/yyyy');
    } else if (date instanceof Date) {
      // If date is already a JavaScript Date, format it directly
      console.log(date);
      return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
    return null; // Return null if date is invalid
  }

  deleteRecord(id:string) {
    this.transactionService.deleteRecord(this.collectionName, id);
  }
  
}
