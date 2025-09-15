import { Component } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-categorywise-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-categorywise-transaction-history.component.html',
  styleUrl: './view-categorywise-transaction-history.component.scss'
})
export class ViewCategorywiseTransactionHistoryComponent {
  constructor(private transactionService: TransactionService) {}
  categoryWiseDetails$ = combineLatest([
    this.transactionService.getAllRecords('TransactionLog', 'transactionId'),
    this.transactionService.getAllRecords('Category', 'categoryId')
  ]).pipe(
    map(([transactions, categories])=> {
      const result: { categoryId: string; categoryName: string; totalAmount: number}[] =[];
      categories.forEach(cat => {
        const catTransactions = transactions.filter(t => t.categoryId === cat.categoryId);
        const total = catTransactions.reduceRight((sum, t) => sum + t.amount, 0);
        result.push({
          categoryId: cat.categoryId,
          categoryName: cat.name,
          totalAmount: total
        });
      });
      return result;
    })
  );
  ngOnInit() {
    this.transactionService.getAllRecords('TransactionLog', 'transactionId')
  } 
}
