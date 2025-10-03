import { Component, inject } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MonthlyInvestmentModal } from '../../modal/transaction.modal';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-automatic-calculation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './automatic-calculation.component.html',
  styleUrl: './automatic-calculation.component.scss'
})
export class AutomaticCalculationComponent {
    allTransactions$!: Observable<MonthlyInvestmentModal[]>;
    collectionName = 'MonthlyInvestment';
    collectionId  = 'monthlyInvestmentId';
    sortedColumnName = 'startDate';
    sortedDirection: 'asc' | 'desc' = 'desc';
    subscriptions: Subscription[] = [];
    syncTransaction: boolean = false;
  
    constructor(private transactionService: TransactionService) {}
    ngOnInit() {
      this.allTransactions$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId, this.sortedColumnName, this.sortedDirection)
      .pipe(
        tap(transactions =>
            transactions.forEach(transaction => {
              console.log(transaction);
            } 
          )
        )
      )
    }  
    getCurrentDayOfMonth() {
      return new Date().getDate();
    }
    
    
    ngOnDestroy(): void {
      if(this.subscriptions.length>0) {
        this.subscriptions.forEach((sub)=>sub.unsubscribe());
      }
    }
    // monthsDiffDetailed(start: Date, end: Timestamp): number {
    //     const startDate = start;
    //     const endDate = end?.toDate();
    //     let months =
    //       (endDate?.getFullYear() - startDate?.getFullYear()) * 12 +
    //       (endDate?.getMonth() - startDate?.getMonth());
    
    //     // If end day is less than start day → subtract 1 month
    //     if (endDate?.getDate() < startDate?.getDate()) {
    //       months--;
    //     }
    //     return months;
    //   }
}


/*
this.filteredTransactions$ = this.allTransactions$.pipe(
  map(transactions => transactions.filter(t => t.amount > 1000))
);
*/

