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

  constructor(private http: HttpClient) {}

  registrarGrua(): void{
    const grua = {
      modelo: this.modelo,
      numeroDeSerie: this.numeroDeSerie,
      placa: this.placa,
      tipoDeGrua: this.tipoDeGrua
    };

    this.http.post('http://localhost:3000/Registrar-Grua',grua).subscribe(
      (response: any) =>{
        Swal.fire('Exito',response.message,'success');
        // Limpiar los campos del formulario
        this.modelo = '';
        this.numeroDeSerie = '';
        this.placa = '';
        this.tipoDeGrua = '';
      },
      (error)=>{
        Swal.fire('Error','No se pudo registrar la grua','error');
        console.log(error);
      }
    );
  }
}
