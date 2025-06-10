import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-gruas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ver-gruas.component.html',
  styleUrl: './ver-gruas.component.css'
})
export class VerGruasComponent {
  gruas: any[] = [];
  gruaseleccionada: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarGruas();
  }

  // Método para obtener las grúas desde el backend
  cargarGruas(): void {
    this.http.get<any[]>('http://localhost:3000/api/gruas/ver-gruas').subscribe(
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

  // Método para abrir el modal de edición de grúa
  abrirModal(grua: any): void {
    this.gruaseleccionada = { ...grua }; // Copia los datos de la grúa para edición

    Swal.fire({
      title: 'Editar Grúa',
      html: `
        <form id="editForm">
          <div class="mb-3">
            <label for="modelo" class="col-form-label">Modelo:</label>
            <input type="text" class="form-control" id="modelo" value="${this.gruaseleccionada.modelo}" required>
          </div>
          <div class="mb-3">
            <label for="numeroDeSerie" class="col-form-label">Número de Serie:</label>
            <input type="text" class="form-control" id="numeroDeSerie" value="${this.gruaseleccionada.numero_serie}" required>
          </div>
          <div class="mb-3">
            <label for="placa" class="col-form-label">Placa:</label>
            <input type="text" class="form-control" id="placa" value="${this.gruaseleccionada.placa}" required>
          </div>
          <div class="mb-3">
            <label for="tipoDeGrua" class="col-form-label">Tipo:</label>
            <input type="text" class="form-control" id="tipoDeGrua" value="${this.gruaseleccionada.tipo_grua}" required>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const modelo = (document.getElementById('modelo') as HTMLInputElement).value;
        const numeroDeSerie = (document.getElementById('numeroDeSerie') as HTMLInputElement).value;
        const placa = (document.getElementById('placa') as HTMLInputElement).value;
        const tipoDeGrua = (document.getElementById('tipoDeGrua') as HTMLInputElement).value;

        return { modelo, numeroDeSerie, placa, tipoDeGrua };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.actualizarGrua(result.value);
      }
    });
  }

  // Método para actualizar los datos de la grúa
  actualizarGrua(actualizacion: any): void {
    this.http.put(`http://localhost:3000/editar-grua/${this.gruaseleccionada.id}`, actualizacion).subscribe(
      (response) => {
        Swal.fire('Success', 'Grúa editada correctamente', 'success');
        this.cargarGruas(); // Actualiza la lista después de guardar los cambios
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron guardar los cambios', 'error');
        console.error('Error al guardar los cambios:', error);
      }
    );
  }
}
