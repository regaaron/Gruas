import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.post('http://localhost:3000/login', { username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          this.router.navigate(['/menu']); // Redirigir a la página principal
        },
        error: (error) => {
          console.error('Error durante el inicio de sesión:', error);
          Swal.fire('Error','Contraseña o usuario incorrecto','error');
          this.errorMessage = error.error?.error || 'Ocurrió un error';
        }
      });
  }
  
}
