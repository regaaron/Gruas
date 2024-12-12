import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})

export class VentasComponent {
  viajes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void{
    this.getViajes();
  }

  getViajes(): void{
    this.http.get('http://localhost:3000/ver-viajes').subscribe(
      (response: any) =>{
        this.viajes = response;
      },
      (error: any) =>{
        Swal.fire('Error',"No se pudo cargar los viajes", error);
        console.log(error);
      }
    )
  }
  

}
