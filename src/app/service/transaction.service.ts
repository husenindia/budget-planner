import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Category, TransactionLog } from '../modal/transaction.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore: Firestore) { }

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
}
