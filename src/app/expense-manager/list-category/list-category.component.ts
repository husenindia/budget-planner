import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { TransactionService } from '../../service/transaction.service';
import { RouterModule } from '@angular/router';
import { CategoryModal } from '../../modal/transaction.modal';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
  providers: [DatePipe]
})
export class ListCategoryComponent {
  allCategory$!: Observable<CategoryModal[]>;
  collectionName = 'Category';
  collectionId  = 'categoryId';
  constructor(private transactionService: TransactionService, private datePipe: DatePipe) {}
  ngOnInit() {
    this.allCategory$ = this.transactionService.getAllRecords(this.collectionName, this.collectionId);
  }
  deleteRecord(id:string) {
    this.transactionService.deleteRecord(this.collectionName, id);
  }
  
}
