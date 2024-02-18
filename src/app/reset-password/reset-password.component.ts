// reset-password.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  email!: string;
  token!: string;
  resetSuccess = false;
showform=true;
msg:string='';
  constructor(
    private authService: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }
    
    const newPassword = this.resetForm.value.newPassword;
    this.authService.resetPassword(this.email, this.token, newPassword).subscribe(
      () => {
        console.log('Password reset successful');
        // Redirect the user to a success page or login page
        this.msg='Password reset successful';
        this.resetSuccess = true;
        this.showform=false;
      },
      (error) => {
        console.error('Password reset failed', error);
        // Handle error, display error message, etc.
        this.msg='Password reset failed';
        this.resetSuccess = true;
        this.showform=false;
      }
    );
  }
}
