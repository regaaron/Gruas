import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: any[] = []; // Almacenará la lista de clientes

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getClientes();
  }

  // Método para obtener los clientes desde el backend
  getClientes(): void {
    this.http.get('http://localhost:3000/ver-clientes/').subscribe(
      (response: any) => {
        this.clientes = response; // Asigna los datos a la variable clientes
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron cargar los clientes', 'error');
        console.error(error);
      }
    );
  }
}
