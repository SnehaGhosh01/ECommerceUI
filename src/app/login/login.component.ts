import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('forgotPasswordModal') forgotPasswordModal!: ElementRef;
  loginForm!: FormGroup;
  message = '';
  showloginfoem=true;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.navigationService
      .loginUser(this.Email.value, this.PWD.value)
      .subscribe((res: any) => {
        if (res.toString() !== 'Username or password incorrect') {
          this.message = 'Logged In Successfully.';
          this.utilityService.setUser(res);
          console.log(this.utilityService.getUser());
          console.log(res);
          this.closeLoginModal();
        } else {
          this.message = 'Invalid Credentials!';
        }
      });
  }
  closeLoginModal() {
    // Use nativeElement to find the login modal and close it
    window.location.reload();
  }
  openForgotPasswordModal(): void {
    const modal = this.forgotPasswordModal.nativeElement;
    if (modal) {
      this.renderer.addClass(modal, 'show');
      this.renderer.setStyle(modal, 'display', 'block');
    }
  }
  navigateToForgotPassword(): void {
   
    this.router.navigate(['/forgot-password']);
    
  }
toggole(){
  this.showloginfoem=!this.showloginfoem;
}
  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
