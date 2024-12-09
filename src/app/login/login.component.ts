import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router,private http: HttpClient) {
  }
  username: string = '';
  password: string = ''; // Solo para captura, no lo validamos ahora
  errorMessage: string = '';

  login() {
    if (!this.username) {
      this.errorMessage = 'El nombre de usuario es obligatorio';
      return;
    }
    console.log(this.username)
    this.http.post('http://localhost:3000/login', { username: this.username })
      .subscribe({
        next: (response: any) => {
          console.log('Inicio de sesión exitoso:', response);
          // Redirigir al usuario a otra página después del inicio de sesión
          this.router.navigate(['/menu/']);
        },
        error: (error) => {
          console.error('Error durante el inicio de sesión:', error);
          this.errorMessage = error.error?.error || 'Ocurrió un error';
        }
      });
  }
  
}
