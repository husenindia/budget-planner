import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { KababCasePipe } from '../../pipe/kabab-case.pipe';

@Component({
  selector: 'app-supplier-detail',
  standalone: true,
  imports: [NgOptimizedImage, KababCasePipe],
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.scss'
})
export class SupplierDetailComponent {
isLoggedIn = true;
operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, {id: 'linux', name: 'Linux'}];
}
