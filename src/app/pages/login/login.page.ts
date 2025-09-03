import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/shared/services/storage/storage';

interface Iuser {
  Name: string;
  LastName: string;
  Email: string;
  Password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public Email = new FormControl('', [Validators.required, Validators.email]);
  public Password = new FormControl('', [Validators.required]);

  public loginForm = new FormGroup({
    Email: this.Email,
    Password: this.Password,
  });

  public errorMessage = '';

  constructor(private storage: AppStorage, private router: Router) {}
  ngOnInit() {}

  doLogin() {
    this.errorMessage = '';
    if (this.loginForm.invalid) return;

    const users = this.storage.get<Iuser[]>('users') || [];
    const email = (this.Email.value || '').trim().toLowerCase();
    const pass  = this.Password.value || '';

    const user = users.find(u => (u.Email || '').trim().toLowerCase() === email);

    if (!user) {
      this.errorMessage = 'El correo no está registrado';
      return;
    }
    if (user.Password !== pass) {
      this.errorMessage = 'Contraseña incorrecta';
      return;
    }

    // (opcional) guarda sesión ligera
    this.storage.set('currentUser', { Email: user.Email, Name: user.Name });

    // navega solo si todo está correcto
    this.router.navigate(['/register']); // o a '/home' si ya tienes esa ruta
  }
}


