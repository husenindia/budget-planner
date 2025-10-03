import { Timestamp } from "@angular/fire/firestore";

export interface TransactionLogModal {
  name: string;  
  transactionId: string;
  cause: string; 
  amount: number;
  categoryId: string; 
  categoryName: string; 
  transactionType: boolean;  
  date: Date | Timestamp;
}

export interface CategoryModal {
  categoryId: string;
  name: string;    
  description: string; 
}
export interface TransactionLogWithFormattedDate extends TransactionLogModal {
  formattedDate: any | null; // Add formattedDate as a string or null
}
export interface MonthlySummaryModal {
  year: number;
  month: number;
  debitTotal: number;
  creditTotal: number;
  netTotal: number;  // Net savings for the month
  investmentTotal: number;
}


export interface InvestmentModal {
  name: string;  
  investmentId: string;
  cause: string; 
  amount: number;
  categoryId: string; 
  categoryName: string; 
  date: Date | Timestamp;
}
export interface InvestmentWithFormattedDateModal extends InvestmentModal {
  formattedDate: any | null; // Add formattedDate as a string or null
}

export interface MonthlyInvestmentModal extends GenericFormattedDate, NumberOfInstallments {
  name: string;  
  monthlyInvestmentId: string;
  cause: string; 
  amount: number;
  categoryId: string; 
  categoryName: string; 
  expectedReturn: number;
  startDate: Date | Timestamp;
  lastProcessedDate: Date | Timestamp;
}

export interface GenericFormattedDate {
  formattedDate: Date | Timestamp | null | any;
}

export interface NumberOfInstallments {
  numberOfInstallments: number;
}
export interface AmountInvested {
  amountInvested: number;
}
