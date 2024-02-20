import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from '../models/models';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  invalidRPWD: boolean = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required,Validators.minLength(10),Validators.pattern('.*\\d{6}.*')]],
      pin: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      mobile: ['', [Validators.required,Validators.pattern('[0-9]{10}')]], // Removed Validators.required
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          this.passwordValidator(),
        ],
      ],
      rpwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    }, {
      validators: this.passwordMatchValidator('pwd', 'rpwd'),
    });
    
  }
  
 /* ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z].*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      mobile: ['', Validators.required],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          this.passwordValidator(),
        ],
      ],
      rpwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    },
    {
      validators: this.passwordMatchValidator('pwd', 'rpwd'), // Add custom validator
    });
  }
*/

  register() {
    let user: UserRegistration = {
      name: this.Name.value,
      email: this.Email.value,
      address: `${this.Address.value},-${this.registerForm.get('pin')?.value}`,
      phone_Number: this.Mobile.value,
      password: this.PWD.value,
    };

    this.navigationService.registerUser(user).subscribe({
      next: (res: any) => {
        this.message = res.toString();
        // Show success message as an alert
        alert('Registration successful. ' + this.message);
        // Optionally, you can reset the form or perform other actions
        this.registerForm.reset();
      },
      error: (error) => {
        console.error(error);
        // Show error message as an alert if needed
        alert('Registration failed. Please try again.');
      },
    });
  }

  passwordValidator() {
    return (control: FormControl) => {
      const value = control.value;
      const hasAlphabet = /[a-zA-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!(hasAlphabet && hasNumber && hasSpecialCharacter)) {
        return { invalidPassword: true };
      }

      return null;
    };
  }
  passwordMatchValidator(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return { mismatchedPasswords: true };
      }

      return null;
    };
  }

  //#region Getters
  get Name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }

  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }

  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }

  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }
  //#endregion
}
