import { Component } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';
import { MonthlySummary, TransactionLogWithFormattedDate } from '../../modal/transaction.modal';


@Component({
  selector: 'app-monthlywise-saving',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monthlywise-saving.component.html',
  styleUrl: './monthlywise-saving.component.scss',
  providers: [DatePipe],
})
export class MonthlywiseSavingComponent {
  allTransactions$!: Observable<TransactionLogWithFormattedDate[]>;
  collectionName = 'TransactionLog';
  collectionId  = 'transactionId';
  monthlySummary: MonthlySummary[] = [];
  subscriptions: Subscription[] = [];
  
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
    this.monthwiseSaving();
  }  
  deleteRecord(id:string) {
    this.transactionService.deleteRecord(this.collectionName, id);
  }

  monthwiseSaving() {
    this.subscriptions.push(this.allTransactions$.subscribe((allTransactions) => {
      const monthlyData: { [key: string]: MonthlySummary } = {};
      allTransactions.forEach(transaction => {
        let parsedDate: Date | null = null;

        const date = transaction.formattedDate;
        if (typeof date === 'string') {
          parsedDate = new Date(date); // Convert string to Date object
        } else if (date instanceof Date) {
          parsedDate = date; // It's already a Date object
        }

        const year = (parsedDate?.getFullYear() as number);
        const month = (parsedDate?.getMonth() as number);  // 0-based (0 = January, 11 = December)
        const key = `${year}-${month}`;

        if (!monthlyData[key]) {
          monthlyData[key] = {
            year:year,
            month:month,
            debitTotal: 0,
            creditTotal: 0,
            netTotal: 0,
            investmentTotal: 0,
          };
        }

        if (transaction.transactionType) {
          // Credit transaction
          monthlyData[key].creditTotal += transaction.amount;
        } else {
          // Debit transaction
          monthlyData[key].debitTotal += transaction.amount;
        }

        monthlyData[key].investmentTotal += monthlyData[key].investmentTotal;
        monthlyData[key].netTotal = monthlyData[key].creditTotal - monthlyData[key].debitTotal;
      });
      this.monthlySummary = Object.values(monthlyData);
    }));
    

  }
  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed to prevent memory leaks
    if (this.subscriptions.length>0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

}
