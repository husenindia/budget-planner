import { Routes } from '@angular/router';
import { ListInvestmentCategoryComponent } from './list-investment-category/list-investment-category.component';
import { AddInvestmentCategoryComponent } from './add-investment-category/add-investment-category.component';
import { AddInvestmentComponent } from './add-investment/add-investment.component';
import { ListMonthlyInvestmentComponent } from './list-monthly-investment/list-monthly-investment.component';
import { AddMonthlyInvestmentComponent } from './add-monthly-investment/add-monthly-investment.component';

export const INVESTMENTMANAGER_ROUTES: Routes = [        
    { path: 'add-investment', component: AddInvestmentComponent },
    { path: 'edit-investment/:id', component: AddInvestmentComponent },
    { path: 'investment-category-list', component: ListInvestmentCategoryComponent },
    { path: 'add-investment-category', component: AddInvestmentCategoryComponent },
    { path: 'edit-investment-category/:id', component: AddInvestmentCategoryComponent },

    { path: 'monthly-investment-list', component: ListMonthlyInvestmentComponent },
    { path: 'add-monthly-investment', component: AddMonthlyInvestmentComponent },
    { path: 'edit-monthly-investment/:id', component: AddMonthlyInvestmentComponent },

];
