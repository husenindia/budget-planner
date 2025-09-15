import { Timestamp } from "@angular/fire/firestore";

export interface TransactionLog {
  name: string;  
  transactionId: string;
  cause: string; 
  amount: number;
  categoryId: string; 
  categoryName: string; 
  transactionType: boolean;  
  date: Date | Timestamp;
}

export interface Category {
  categoryId: string;
  name: string;    
  description: string; 
}