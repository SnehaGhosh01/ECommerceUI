// ewallet.component.ts
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { WalletRechargeModel } from '../models/models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormGroup, FormBuilder, and Validators

@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.css'],
})
export class EWalletComponent implements OnInit {
  userId: any;
  registrationData: any = {
    password: '',
    confirmPassword: '',
    cardNumber: '',
    cvvNumber: '',
    cardHolderName: '',
    amount: 0,
  };
  rechargeData: WalletRechargeModel = new WalletRechargeModel(0, 0, '', 0);
  passwordChangeData: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '' // Add this property
  };
  forgetPasswordData: any = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  eWalletBalance: any;
  showRechargeForm: boolean = false;
  showChangePassword: boolean = false;
  changePasswordForm!: FormGroup; // Declare changePasswordForm as FormGroup
registerForm!: FormGroup;
showForgetPassword:boolean=false;
forgetPasswordForm!:FormGroup;
showRegisterform:boolean=false;
  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = this.utilityService.getUserIdFromLocalStorage();

    // Initialize changePasswordForm
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    });
this.registerForm = this.fb.group({
  
  password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  confirmPassword: ['', Validators.required],
  amount: ['', [Validators.required, Validators.min(1)]],
  cvvNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
  cardHolderName: ['', Validators.required]
});
this.forgetPasswordForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  confirmPassword: ['', Validators.required]
});
    this.checkEWalletBalance();
  }

  showChangePasswordForm() {
    this.showChangePassword = !this.showChangePassword;
    this.hideRechargeForm();
    this.showForgetPassword=false;
    this.showRegisterform=false;
  }
  showChangeRegistraionForm(){
    this.showRegisterform=!this.showRegisterform;
    this.hideRechargeForm();
    
    this.showForgetPassword=false;
    this.showChangePassword=false;
  }
  showForgetPasswordForm(){
    this.showForgetPassword=!this.showForgetPassword;
    this.showChangePassword=false;
    this.hideRechargeForm();
  }
  passwordsMatchRegistration(): boolean {
    return this.registrationData.password === this.registrationData.confirmPassword;
  }
  passwordsMatchForget(): boolean {
    return this.forgetPasswordData.password === this.forgetPasswordData.confirmPassword;
  }
  validateConfirmPasswordForget() {
    this.forgetPasswordForm.controls['confirmPassword'].updateValueAndValidity();
  }
  validateConfirmPasswordRegister() {
    this.registerForm.controls['confirmPassword'].updateValueAndValidity();
  }
  validateConfirmPassword() {
    this.changePasswordForm.controls['confirmPassword'].updateValueAndValidity();
  }

  passwordsMatchChange(): boolean {
    const newPassword = this.passwordChangeData.newPassword;
    const confirmPassword = this.passwordChangeData.confirmPassword;
    return newPassword === confirmPassword;
  }

  registerForEWallet() {
    this.navigationService
      .registerForEWallet(this.userId, this.registrationData)
      .subscribe(
        (response) => {
          this.checkEWalletBalance();
          window.alert(response);
          console.log('Registration success:', response);
        },
        (error) => {
          window.alert('Something went wrong.Check if you already have an e-wallet registered.');
          console.error('Registration error:', error);
        }
      );
  }

  rechargeEWallet() {
    this.navigationService
      .rechargeEWallet(this.userId, this.rechargeData)
      .subscribe(
        (response) => {
          this.checkEWalletBalance();
          window.alert('Successfully recharged.');
          this.hideRechargeForm();
          console.log('Recharge success:', response);
        },
        (error) => {
          window.alert('Something went wrong.');
          console.error('Recharge error:', error);
        }
      );
  }

  changeEWalletPassword() {
    this.navigationService
      .changeEWalletPassword(this.userId, this.passwordChangeData)
      .subscribe(
        (response) => {
          window.alert(response);
          console.log('Password change success:', response);
        },
        (error) => {
          console.error('Password change error:', error);
        }
      );
  }

  forgetEWalletPassword() {
    this.navigationService
      .forgetEWalletPassword(this.userId, this.forgetPasswordData)
      .subscribe(
        (response) => {
          console.log('Forget password success:', response);
        },
        (error) => {
          console.error('Forget password error:', error);
        }
      );
  }

  checkEWalletBalance() {
    this.navigationService.checkEWalletBalance(this.userId).subscribe(
      (balance) => {
        this.eWalletBalance = balance;
        console.log('Wallet balance:', this.eWalletBalance);
      },
      (error) => {
        console.error('Check balance error:', error);
      }
    );
  }

  navigateToRecharge() {
    this.showRechargeForm = !this.showRechargeForm;
    this.showChangePassword=false;
    this.showRegisterform=false;
    this.showForgetPassword=false;
  }

  hideRechargeForm() {
    this.showRechargeForm = false;
  }

  passwordsMatch(): boolean {
    return this.registrationData.password === this.registrationData.confirmPassword;
  }
}
