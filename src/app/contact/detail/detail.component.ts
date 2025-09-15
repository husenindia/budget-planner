import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @ViewChild('templateVariable1',{static: false}) templateVariable1!:ElementRef;
  lifecycleTicks: number = 0;
  flag: boolean = false;

  constructor() {
    console.log('=======\nconstructor: ', this.firstName);
  }
  

  @ViewChild('templateVariableName',{static: false}) templateVariable2!: ElementRef;
  @Input() firstName: string | undefined;
  ngOnInit() {
    console.log('=======\nngOnInit: ', this.firstName);    
  }
  ngAfterViewInit() {
    console.log('=======\nng After View Init: ', this.firstName);
  }
  ngAfterViewChecked() {
    console.log('=======\nng After View Checked: ', this.firstName);
  }

  ngAfterContentInit() {
    console.log('=======\nng After Content Init: ', this.firstName);
  }
  ngAfterContentChecked() {
    console.log('=======\nng After Content Checked: ', this.firstName);
  }


  ngOnChanges(changes: SimpleChanges) {
    const firstName = changes['firstName'];
    console.log('=======\nngOnChange: ', `Name changed from ${firstName.previousValue} to ${firstName.currentValue}`);
    this.lifecycleTicks++;
  }


  toggleContent() {
    
  }
  }
