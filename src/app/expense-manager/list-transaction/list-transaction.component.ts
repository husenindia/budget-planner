import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransactionLogWithFormattedDate } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.scss'
})
export class ListTransactionComponent {
  allTransactions$!: Observable<TransactionLogWithFormattedDate[]>;
  collectionName = 'TransactionLog';
  collectionId  = 'transactionId';
  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.allTransactions$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId).pipe(
      map(transactions=> 
        transactions.map(transaction => ({
          ...transaction,
          formattedDate: this.transactionService.formatDate(transaction.date) // Convert and format the date
        })) 
      )
    );
  }  
  deleteRecord(id:string) {
    this.transactionService.deleteRecord(this.collectionName, id);
  }
  
}
