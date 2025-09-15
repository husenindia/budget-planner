// In your Angular component or service
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Employee {  
  EmpName: string; 
  DeptId: number; 
  Salary: number;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private firestore: Firestore) {}

  async addEmployee(employee: Employee) {
    const employeesCollection = collection(this.firestore, 'Employee');
    await addDoc(employeesCollection, employee); 
    console.log('Employee added!');
  }

  getEmployees(): Observable<Employee[]> {
    const employeesCollection = collection(this.firestore, 'Employee');
    return collectionData(employeesCollection, { idField: 'firestoreId' }) as Observable<Employee[]>;
  }
}