import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-registrar-conductor',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registrar-conductor.component.html',
  styleUrl: './registrar-conductor.component.css'
})
export class RegistrarConductorComponent {
  showErrors: boolean = false; // Controla cuándo mostrar los mensajes de error
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) { }

  // Método de registro
  registrar() {

    // Validaciones del formulario
    if (!this.nombre || !this.apellido || !this.direccion || !this.telefono || !this.email || !this.password) {
      Swal.fire('Error', 'Todos los campos son requeridos', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const data = {
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email,
      password: this.password
    };

    // Realizar el POST al servidor para registrar al conductor
    this.http.post('http://localhost:3000/api/conductores/Registrar-Conductor', data).subscribe(
      (response: any) => {
        Swal.fire('Éxito', 'Conductor registrado con éxito', 'success');
        
        // Limpiar los campos después de un registro exitoso
        this.nombre = '';
        this.apellido = '';
        this.direccion = '';
        this.telefono = '';
        this.email = ''
        this.password = '';
        this.confirmPassword = '';
      },
      (error) => {
        if (error.status === 400 && error.error.message === 'El conductor ya existe') {
          Swal.fire('Error', 'El conductor ya está registrado', 'error');
        } else if (error.status === 400) {
          Swal.fire('Error', 'Todos los campos son requeridos', 'error');
        } else {
          Swal.fire('Error', 'No se pudo registrar el conductor. Intente más tarde.', 'error');
        }
      }
    );
  }
}
