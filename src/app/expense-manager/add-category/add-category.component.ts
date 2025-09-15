import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { Category } from '../../modal/transaction.modal';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})

export class AddCategoryComponent {
  recordId: string | null = null;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.recordId = this.activatedRoute.snapshot.paramMap.get('id');
    this.formInit(); 
    if (this.recordId) {      
      this.loadRecord(this.recordId);
    }  
  }

  async loadRecord(id: string) {    
      const snapshot = await this.transactionService.getRecordById('Category', id);
      if (snapshot.exists()) {
        this.categoryForm.patchValue(snapshot.data() as Category);
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
  if (this.categoryForm.valid) {      
    const data: Category = this.categoryForm.getRawValue();
      if(this.recordId) { // EDIT
        this.transactionService.updateRecord('Category', this.recordId, data);
      }
      else { // ADD
        this.transactionService.addRecord(data);
      }
      this.categoryForm.reset();
      this.categoryForm.markAsPristine();
  } else {
    this.categoryForm.markAllAsTouched();
  }
}
}

