import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { SupplierDetailComponent } from '../supplier/supplier-detail/supplier-detail.component';

export const ORDER_ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'supplier-detail', component: SupplierDetailComponent}

];