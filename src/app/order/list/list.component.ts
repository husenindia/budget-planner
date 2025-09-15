import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from './order.service';
interface Employee {  
  EmpName: string; 
  DeptId: number; 
  Salary: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  employeeForm!: FormGroup;
  employees$!: Observable<any[]>;
  constructor(private fb: FormBuilder, private employeeService:EmployeeService) {}

  ngOnInit() {
    this.employees$ = this.employeeService.getEmployees();
    this.formInit();    
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.getRawValue();      
      this.employeeService.addEmployee(employee);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  formInit() {
    this.employeeForm = this.fb.group({
      EmpName: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
      DeptId: this.fb.control(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      Salary: this.fb.control(0, { nonNullable: true, validators: [Validators.required, Validators.min(1000)] })
    });
  }
  get form() {
    return this.employeeForm.controls;
  }

}
