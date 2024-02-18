import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email!: string;

  constructor(private authService: NavigationService ) { }

  onSubmit(): void {
    if (!this.email) {
      // Handle empty email
      return;
    }
    this.authService.forgotPassword(this.email).subscribe(
      () => {
        // Password reset link sent successfully
        console.log('Password reset link sent successfully');
      },
      (error) => {
        // Handle error
        console.error('Failed to send password reset link', error);
      }
    );
  }
}
