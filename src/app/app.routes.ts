import { Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { NoAuthGuard } from './authentication/guards/no-auth.guard';

export const routes: Routes = [
    {
    path: 'order',
    loadChildren: () =>
        import('./order/order.routes').then(m => m.ORDER_ROUTES)
    },
    {
        path: 'role',
        loadChildren: () =>
            import('./role/role.routes').then(m => m.ROLE_ROUTES)
    },
    {
        path: 'contact',
        loadChildren: () =>
            import('./contact/contact.routes').then(m =>m.CONTACT_ROUTES)
    },
    {
        path: 'expense-manager',
        loadChildren: () =>
            import('./expense-manager/expense-manager.routes').then(m =>m.EXPENSEMANAGER_ROUTES),
        canActivate: [AuthGuard]
    },    
    {
        path: 'supplier',
        loadChildren: () => 
            import('./supplier/supplier.routes').then(m=>m.SUPPLIER_ROUTES)
    },    
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard] 
    },    
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard] 
    }
];
