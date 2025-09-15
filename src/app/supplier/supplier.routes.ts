import { Routes } from "@angular/router";
import { SupplierListComponent } from "./supplier-list/supplier-list.component";
import { SupplierDetailComponent } from "./supplier-detail/supplier-detail.component";

export const SUPPLIER_ROUTES: Routes = [
    { path: '', component: SupplierListComponent},
    { path: 'supplier-detail', title: 'Supplier Detail page', component: SupplierDetailComponent}
]