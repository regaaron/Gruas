import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-gruas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-gruas.component.html',
  styleUrl: './ver-gruas.component.css'
})
export class VerGruasComponent {
  gruas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarGruas();
  }

  cargarGruas(): void {
    this.http.get<any[]>('http://localhost:3000/ver-gruas').subscribe(
      (data) => {
        this.gruas = data;
        console.log('Gruas:', this.gruas);
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron cargar las grúas', 'error');
        console.error('Error al cargar las grúas:', error);
      }
    );
  }
}
