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
  conductores: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarGruas();
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
  // Asignamos el id_conductor para que el select funcione correctamente
  this.gruaseleccionada = {
    ...grua,
    id_conductor: grua.id_usuario
  };

  const options = this.conductores.map(c => {
    const selected = c.id_usuario === this.gruaseleccionada.id_conductor ? 'selected' : '';
    return `<option value="${c.id_usuario}" ${selected}>${c.nombre} ${c.apellido}</option>`;
  }).join('');
  
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
        <div class="mb-3">
          <label for="conductor" class="col-form-label">Conductor:</label>
          <select id="conductor" class="form-control">
            ${options}
          </select>
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
      const id_conductor = (document.getElementById('conductor') as HTMLSelectElement).value;

      return { modelo, numeroDeSerie, placa, tipoDeGrua, id_conductor };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.actualizarGrua({
        ...result.value,
        id_grua: this.gruaseleccionada.id_grua
      });
    }
  });
}


  // Método para actualizar los datos de la grúa
  actualizarGrua(gruaEditada: any) {
  this.http.put(`http://localhost:3000/api/gruas/editar-grua/${gruaEditada.id_grua}`, gruaEditada).subscribe(
    () => {
      Swal.fire('Éxito', 'Grúa actualizada correctamente', 'success');
      this.cargarGruas(); // Vuelve a cargar la lista de grúas
    },
    (error) => {
      Swal.fire('Error', 'No se pudo actualizar la grúa', 'error');
      console.error(error);
    }
  );
}

}
