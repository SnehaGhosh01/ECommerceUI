import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

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
  showform = true;
  msg: string = '';

  constructor(
    private authService: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6),this.passwordPatternValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
  
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      return null;
    }
  };
  passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!pattern.test(control.value)) {
        return { 'pattern': true };
      }
      return null;
    };
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
        this.msg = 'Password reset successful';
        this.resetSuccess = true;
        this.showform = false;
      },
      (error) => {
        console.error('Password reset failed', error);
        // Handle error, display error message, etc.
        this.msg = 'Password reset failed';
        this.resetSuccess = true;
        this.showform = false;
      }
    );
  }
}
