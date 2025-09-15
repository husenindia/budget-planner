import { Component } from '@angular/core';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [DetailComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  firstName:string = 'Husen Telwala';
  constructor() {
    setTimeout(() => {
      this.firstName = 'Telwala Husen';
    }, 2000);
  }
}
