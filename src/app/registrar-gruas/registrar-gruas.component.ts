import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-gruas',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registrar-gruas.component.html',
  styleUrl: './registrar-gruas.component.css'
})
export class RegistrarGruasComponent {
  modelo: string = '';
  numeroDeSerie: string = '';
  placa: string = '';
  tipoDeGrua: string = '';
  conductores: any[] = [];
  conductorSeleccionado: number | null = null;



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getConductores();
  }

  getConductores(): void {
      this.http.get('http://localhost:3000/api/conductores/ver-conductores/').subscribe(
        (response: any) => {
          this.conductores = response;
          console.log(this.conductores);
        },
        (error) => {
          Swal.fire('Error', 'No se pudieron cargar los conductores', 'error');
          console.error(error);
        }
      );
    }

  registrarGrua(): void {
  const grua = {
    modelo: this.modelo,
    numeroDeSerie: this.numeroDeSerie,
    placa: this.placa,
    tipoDeGrua: this.tipoDeGrua,
    id_conductor: this.conductorSeleccionado  // Envía solo el ID
  };

  console.log('Datos de la grúa a registrar:', grua);
  this.http.post('http://localhost:3000/api/gruas/Registrar-Grua/', grua).subscribe(
    (response: any) => {
      Swal.fire('Éxito', response.message, 'success');
      this.modelo = '';
      this.numeroDeSerie = '';
      this.placa = '';
      this.tipoDeGrua = '';
      this.conductorSeleccionado = null;

    },
    (error) => {
      Swal.fire('Error', 'No se pudo registrar la grúa', 'error');
      console.log(error);
    }
  );
}

}
