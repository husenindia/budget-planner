import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { CategoryModal } from '../../modal/transaction.modal';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-investment-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-investment-category.component.html',
  styleUrl: './add-investment-category.component.scss'
})
export class AddInvestmentCategoryComponent {
recordId: string | null = null;
  categoryForm!: FormGroup;
  collectionCategory = 'InvestmentCategory';

  constructor(private fb: FormBuilder, private router: Router, private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.recordId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formInit(); 
    if (this.recordId) {      
      this.loadRecord(this.recordId);
    }  
  }

  async loadRecord(id: string) {    
      const snapshot = await this.transactionService.getRecordById(this.collectionCategory, id);
      if (snapshot.exists()) {
        this.categoryForm.patchValue(snapshot.data() as CategoryModal);
      }
    }
  

  formInit() {
    this.categoryForm = this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      description: this.fb.control('', { nonNullable: true })
    });
  }
  
  get f() {
    return this.categoryForm.controls;
  }

  onSubmit(): void {  
    console.log('Category form submitted');   
    if (this.categoryForm.valid) {      
      const data: CategoryModal = this.categoryForm.getRawValue();
        if(this.recordId) { // EDIT
          this.transactionService.updateRecord(this.collectionCategory, this.recordId, data);
        }
        else { // ADD
          this.transactionService.addRecord(this.collectionCategory, data);
        }
        this.router.navigate(['/investment-manager/investment-category-list']);
        this.categoryForm.reset();
        this.categoryForm.markAsPristine();
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
