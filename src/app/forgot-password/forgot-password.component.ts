import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  email!: string;
  private reloadFlag = false;

  constructor(private authService: NavigationService ) { 
   
  }
  ngOnInit(): void {
   
      this.ReloadPageOnce();
    
  }
ReloadPageOnce(){
  if(this.reloadFlag){
    return;
  }
  
}
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
