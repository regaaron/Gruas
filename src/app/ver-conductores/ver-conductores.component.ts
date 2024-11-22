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

  conductores: any[] = [];  // Almacenará la lista de conductores

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
}
