import { Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ViewCategorywiseTransactionHistoryComponent } from './view-categorywise-transaction-history/view-categorywise-transaction-history.component';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { MonthlywiseSavingComponent } from './monthlywise-saving/monthlywise-saving.component';

export const EXPENSEMANAGER_ROUTES: Routes = [
  { path: 'add-transaction', component: AddTransactionComponent },
  { path: 'edit-transaction/:id', component: AddTransactionComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'edit-category/:id', component: AddCategoryComponent },
  { path: 'transaction-list', component: ListTransactionComponent },
  { path: 'category-list', component: ListCategoryComponent },
  { path: 'categorywise-transaction-history', component: ViewCategorywiseTransactionHistoryComponent },
  { path: 'monthly-saving', component: MonthlywiseSavingComponent },
  
];
