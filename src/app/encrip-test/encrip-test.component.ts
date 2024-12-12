import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encrip-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encrip-test.component.html',
  styleUrl: './encrip-test.component.css'
})
export class EncripTestComponent {
  clientes: any[] = []; // Almacenará la lista de clientes

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getClientes();
  }

  // Método para obtener los clientes desde el backend
  getClientes(): void {
    this.http.get('http://localhost:3000/test2/').subscribe(
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
