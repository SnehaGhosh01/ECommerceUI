// ewallet.component.ts
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { WalletRechargeModel } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-wallet',
  templateUrl: './e-wallet.component.html',
  styleUrls: ['./e-wallet.component.css'],
})
export class EWalletComponent implements OnInit {
  userId: any; // Assuming you have a way to get the user ID, you can set it accordingly
  registrationData: any = {}; // Initialize with appropriate properties
  rechargeData: WalletRechargeModel = new WalletRechargeModel(0, 0, '', 0); // Initialize with appropriate properties
  passwordChangeData: any = {}; // Initialize with appropriate properties
  forgetPasswordData: any = {}; // Initialize with appropriate properties
  eWalletBalance: any;
  showRechargeForm: boolean = false;

  constructor(
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user ID, assuming it's stored in your application
    this.userId = this.utilityService.getUserIdFromLocalStorage(); // Replace with actual user ID retrieval logic

    // Call CheckEWalletBalance API to get the eWallet balance on component initialization
    this.checkEWalletBalance();
  }

  registerForEWallet() {
    this.navigationService
      .registerForEWallet(this.userId, this.registrationData)
      .subscribe(
        (response) => {
          console.log('Registration success:', response);
          // Handle success, maybe show a success message to the user
        },
        (error) => {
          console.error('Registration error:', error);
          // Handle error, maybe show an error message to the user
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
          // Handle success, maybe show a success message to the user
        },
        (error) => {
          window.alert('Something went wrong.');
          console.error('Recharge error:', error);
          // Handle error, maybe show an error message to the user
        }
      );
  }

  changeEWalletPassword() {
    this.navigationService
      .changeEWalletPassword(this.userId, this.passwordChangeData)
      .subscribe(
        (response) => {
          console.log('Password change success:', response);
          // Handle success, maybe show a success message to the user
        },
        (error) => {
          console.error('Password change error:', error);
          // Handle error, maybe show an error message to the user
        }
      );
  }

  forgetEWalletPassword() {
    this.navigationService
      .forgetEWalletPassword(this.userId, this.forgetPasswordData)
      .subscribe(
        (response) => {
          console.log('Forget password success:', response);
          // Handle success, maybe show a success message to the user
        },
        (error) => {
          console.error('Forget password error:', error);
          // Handle error, maybe show an error message to the user
        }
      );
  }

  checkEWalletBalance() {
    this.navigationService.checkEWalletBalance(this.userId).subscribe(
      (balance) => {
        this.eWalletBalance = balance;
        console.log('Wallet balance:', this.eWalletBalance);
        // Handle balance, maybe display it to the user
      },
      (error) => {
        console.error('Check balance error:', error);
        // Handle error, maybe show an error message to the user
      }
    );
  }
  navigateToRecharge() {
    // Set a flag to show the recharge form
    if(this.showRechargeForm){
      this.showRechargeForm=false;
    }
    else{
    this.showRechargeForm=true;}
  }
  hideRechargeForm() {
    this.showRechargeForm=false;
  }
}
