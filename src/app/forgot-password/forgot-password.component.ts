import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  email!: string;
  private reloadFlag = false;

  constructor(private authService: NavigationService ) { 
   
  }
  

  onSubmit(): void {
    
    if (!this.email) {
      // Handle empty email
      return;
    }
    this.authService.forgotPassword(this.email).subscribe(
      () => {
        alert('Password reset link sent successfully');
        // Password reset link sent successfully
        console.log('Password reset link sent successfully');
        //window.location.reload();
      },
      (error) => {
        // Handle error
        alert('Failed to send password reset link');
        console.error('Failed to send password reset link', error);
      }
    );
  }
}
