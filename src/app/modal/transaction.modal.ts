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
export interface TransactionLogWithFormattedDate extends TransactionLog {
  formattedDate: any | null; // Add formattedDate as a string or null
}

export interface MonthlySummary {
  year: number;
  month: number;
  debitTotal: number;
  creditTotal: number;
  netTotal: number;  // Net savings for the month
  investmentTotal: number;
}
