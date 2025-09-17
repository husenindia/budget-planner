import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
loading = false;
  error?: string;

  form = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = undefined;
    const { displayName, email, password } = this.form.value;
    try {
      await this.auth.register(displayName!, email!, password!);
      // navigate away or show success (AuthService may redirect)
    } catch (err: any) {
      this.error = err?.message ?? 'Registration failed';
    } finally {
      this.loading = false;
    }
  }

}
