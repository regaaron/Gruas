import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { response } from 'express';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-conductores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-conductores.component.html',
  styleUrl: './ver-conductores.component.css'
})
export class VerConductoresComponent {
  conductores: any[] = [];
  conductorSeleccionado: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getConductores();
  }

  // Método para obtener los conductores desde el backend
  getConductores(): void {
    this.http.get('http://localhost:3000/ver-conductores').subscribe(
      (response: any) => {
        this.conductores = response;
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron cargar los conductores', 'error');
        console.error(error);
      }
    );
  }

  // Método para editar un conductor
  editarConductor(conductor: any): void {
    this.conductorSeleccionado = { ...conductor }; // Clonar los datos
  
    Swal.fire({
      title: 'Editar Conductor',
      html: `
        <div style="text-align: left;">
          <label for="swal-nombre">Nombre:</label>
          <input id="swal-nombre" class="swal2-input" value="${this.conductorSeleccionado.nombre}">
          
          <label for="swal-apellido">Apellido:</label>
          <input id="swal-apellido" class="swal2-input" value="${this.conductorSeleccionado.apellido}">
          
          <label for="swal-direccion">Dirección:</label>
          <input id="swal-direccion" class="swal2-input" value="${this.conductorSeleccionado.direccion}">
          
          <label for="swal-telefono">Teléfono:</label>
          <input id="swal-telefono" class="swal2-input" value="${this.conductorSeleccionado.telefono}">
          <br>
          <label for="swal-email">Email:</label>
          <input id="swal-email" class="swal2-input" type="email" value="${this.conductorSeleccionado.email}">
          
          <label for="swal-password">Contraseña:</label>
          <input id="swal-password" class="swal2-input" type="password" value="${this.conductorSeleccionado.password}">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return {
          nombre: (document.getElementById('swal-nombre') as HTMLInputElement).value,
          apellido: (document.getElementById('swal-apellido') as HTMLInputElement).value,
          direccion: (document.getElementById('swal-direccion') as HTMLInputElement).value,
          telefono: (document.getElementById('swal-telefono') as HTMLInputElement).value,
          email: (document.getElementById('swal-email') as HTMLInputElement).value,
          password: (document.getElementById('swal-password') as HTMLInputElement).value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const datosActualizados = result.value;
        this.conductorSeleccionado = { ...this.conductorSeleccionado, ...datosActualizados };
        this.guardarCambios();
      }
    });
  }
  
  
  // Método para guardar los cambios
  guardarCambios(): void {
    this.http
      .put(`http://localhost:3000/actualizar-conductor/${this.conductorSeleccionado.id}`, this.conductorSeleccionado)
      .subscribe(
        () => {
          Swal.fire('Éxito', 'Conductor actualizado correctamente', 'success');
          this.getConductores(); // Refrescar la lista
        },
        (error) => {
          Swal.fire('Error', 'No se pudo actualizar el conductor', 'error');
          console.error(error);
        }
      );
  }
  
}
