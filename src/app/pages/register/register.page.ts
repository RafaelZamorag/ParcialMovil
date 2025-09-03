import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AppStorage } from 'src/app/shared/services/storage/storage';

interface Iuser {
  Name: string;
  LastName: string;
  Email: string;
  Password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public Name!: FormControl;
  public LastName!: FormControl;
  public Email!: FormControl;
  public Password!: FormControl;
  public ConfirmPassword!: FormControl;
  public registerForm!: FormGroup;
  public errorMessage: string = '';
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

toggleConfirmPasswordVisibility() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

  constructor(private readonly storageService: AppStorage, private readonly router: Router) {
   
    this.initForm();
  }

  ngOnInit() {
    console.log('he inicializado');
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('Password')?.value;
    const confirm = control.get('ConfirmPassword')?.value;
    return pass && confirm && pass !== confirm ? { passwordMismatch: true } : null;
  }

public doRegister() {
  this.errorMessage = '';

  if (this.registerForm.invalid) {
    if (this.registerForm.errors?.['passwordMismatch']) {
      this.errorMessage = 'Las contraseñas no coinciden';
    }
    return;
  }

  let users = this.storageService.get<Iuser[]>('users') || [];

  const email = (this.Email.value as string).trim().toLowerCase();
  const exists = users.some((u) => u.Email.trim().toLowerCase() === email);

  if (exists) {
    this.errorMessage = 'El correo ya está registrado';
    return;
  }

  const nuevoUsuario: Iuser = {
    Name: this.Name.value,
    LastName: this.LastName.value,
    Email: email,
    Password: this.Password.value,
  };

  users.push(nuevoUsuario);
  this.storageService.set('users', users);

  this.registerForm.reset();

  this.router.navigate(['/login']);
}


  private initForm() {
    this.Name = new FormControl('', [Validators.required]);
    this.LastName = new FormControl('', [Validators.required]);
    // this.Country = new FormControl('', [Validators.required]);
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.Password = new FormControl('', [Validators.required]);
    this.ConfirmPassword = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup(
      {
        Name: this.Name,
        LastName: this.LastName,
        // Country: this.Country,
        Email: this.Email,
        Password: this.Password,
        ConfirmPassword: this.ConfirmPassword,
      },
      { validators: this.passwordMatchValidator } 
    );
  }
}
