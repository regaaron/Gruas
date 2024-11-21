import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-conductor',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registrar-conductor.component.html',
  styleUrl: './registrar-conductor.component.css'
})
export class RegistrarConductorComponent {
  showErrors: boolean = false; // Controla cuándo mostrar los mensajes de error

  onSubmit(form: any) {
    if (form.valid) {
      const driverData = form.value;

      // Mostrar datos en consola
      console.log('Datos enviados:', driverData);

      // Mostrar alerta de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: '¡Conductor registrado!',
        text: 'Los datos del conductor se enviaron correctamente.',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar el formulario y restablecer el estado
      form.resetForm(); // Limpia y elimina el estado de validación
      this.showErrors = false; // Oculta los mensajes de error
    } else {
      // Mostrar mensajes de error
      this.showErrors = true;

      // Mostrar alerta de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, completa todos los campos obligatorios antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
