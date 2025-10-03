import { Component, inject } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TransactionLogWithFormattedDate } from '../../modal/transaction.modal';
import { TransactionService } from '../../service/transaction.service';
import { RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';


@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.scss'
})
export class ListTransactionComponent {
  allTransactions$!: Observable<TransactionLogWithFormattedDate[]>;
  collectionName = 'TransactionLog';
  collectionId  = 'transactionId';
  sortedColumnName = 'date';
  sortedDirection: 'asc' | 'desc' = 'desc';
  subscriptions: Subscription[] = [];

  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.allTransactions$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId, this.sortedColumnName, this.sortedDirection).pipe(
      map(transactions=> 
        transactions.map(transaction => ({
          ...transaction,
          formattedDate: this.transactionService.formatDate(transaction.date) // Convert and format the date
        })) 
      )
    );
  }  
  readonly dialog = inject(MatDialog);
  deleteConfirmation(transactionId:string) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if(result==true) {
        this.transactionService.deleteRecord(this.collectionName, transactionId);
      }
      else {
        console.log('Delete cancelled');
      }
    }));
  }
  
  ngOnDestroy(): void {
    if(this.subscriptions.length>0) {
      this.subscriptions.forEach((sub)=>sub.unsubscribe());
    }
  }
}
