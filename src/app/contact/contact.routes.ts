import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";

export const CONTACT_ROUTES: Routes = [
    { path:'', component:ListComponent},
    { path:'detail', component: DetailComponent}
]