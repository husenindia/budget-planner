import { Component } from '@angular/core';
import { SupplierDetailComponent } from '../supplier-detail/supplier-detail.component';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [SupplierDetailComponent],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent {

}
