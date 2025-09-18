import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore: Firestore, private datePipe: DatePipe) { }

  getAllRecords(collectionName:string, id:string): Observable<any[]> {
    const collectionLog = collection(this.firestore, collectionName);
    return collectionData(collectionLog, { idField: id }) as Observable<any[]>;
  }


  deleteRecord(collectionName:string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }

  async updateRecord(collectionName:string, id: string, data: any) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    await updateDoc(docRef, data);
  }

  async addRecord(collectionName:string, data: any) {
    const collectionData = collection(this.firestore, collectionName);
    await addDoc(collectionData, data); 
  }

  async getRecordById(collectionName:string, id: string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    const snapshot = await getDoc(docRef);
    return snapshot;
  }
  // Method to handle both Date and Timestamp
  formatDate(date: Date | Timestamp): any | null {
    if (date instanceof Timestamp) {
      // If date is a Firestore Timestamp, convert it to Date
      return this.datePipe.transform(date.toDate(), 'YYYY/MM/dd');
    } else if (date instanceof Date) {
      // If date is already a JavaScript Date, format it directly
      return this.datePipe.transform(date, 'YYYY/MM/dd');
    }
    return null; // Return null if date is invalid
  }
}

