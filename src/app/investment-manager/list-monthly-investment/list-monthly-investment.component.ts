import { Component, inject } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MonthlyInvestmentModal } from '../../modal/transaction.modal';
import { RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../../common/confirmation-popup/confirmation-popup.component';
import { TransactionService } from '../../service/transaction.service';
import { Timestamp } from '@angular/fire/firestore';
import { AutomaticCalculationComponent } from '../automatic-calculation/automatic-calculation.component';

@Component({
  selector: 'app-list-monthly-investment',
  standalone: true,
  imports: [AutomaticCalculationComponent, CommonModule, RouterModule, MatDialogModule],
  templateUrl: './list-monthly-investment.component.html',
  styleUrl: './list-monthly-investment.component.scss'
})
export class ListMonthlyInvestmentComponent {
  allTransactions$!: Observable<MonthlyInvestmentModal[]>;
  collectionName = 'MonthlyInvestment';
  collectionId  = 'monthlyInvestmentId';
  sortedColumnName = 'startDate';
  sortedDirection: 'asc' | 'desc' = 'desc';
  subscriptions: Subscription[] = [];
  syncTransaction: boolean = false;


  constructor(public transactionService: TransactionService) {}
  ngOnInit() {
    this.updateLastProssedDate();
    this.allTransactions$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId, this.sortedColumnName, this.sortedDirection)
    .pipe(
      map(transactions =>
        transactions.map(transaction => ({
          ...transaction,
          formattedDate: this.transactionService.formatDate(transaction.startDate),
          numberOfInstallments: this.transactionService.monthsDiffDetailed(transaction.startDate, transaction.lastProcessedDate)
        })
        )
      )
    )
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

  

  getExpectedReturn(transaction:MonthlyInvestmentModal) {
    if(transaction.categoryName==='SIP') {
      return transaction.amount * (
                                  ((1 + (transaction.expectedReturn / 1200)) ** transaction.numberOfInstallments - 1) / 
                                (transaction.expectedReturn / 1200)
                            ) * (1 + (transaction.expectedReturn / 1200))
    } else {
      return transaction.amount * Math.pow(1 + (transaction.expectedReturn/1200), transaction.numberOfInstallments);
    }
  }
  updateLastProssedDate() {
    this.transactionService.updateAllRecords(this.collectionName , { lastProcessedDate: new Date() });
  }
}


