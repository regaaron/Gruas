import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  center: google.maps.LatLngLiteral = { lat: 21.885454, lng: -102.3023701 }; // Centro del mapa
  zoom = 12;

  icon: google.maps.Icon = {
    url: 'https://cdn-icons-png.flaticon.com/512/416/416610.png', // URL del ícono personalizado
    scaledSize: new google.maps.Size(30, 30), // Tamaño del ícono
  };

  ubicaciones: { nombre: string; ubicacion: { latitud: number; longitud: number }; mostrarLabel: boolean }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUbicaciones();
  }

  // Obtener ubicaciones desde la API
  getUbicaciones(): void {
    this.http.get<any[]>('http://localhost:3000/ver-ubicaciones').subscribe(
      (response) => {
        this.ubicaciones = response.map((ubicacion) => ({
          ...ubicacion,
          mostrarLabel: false,
        }));
      },
      (error) => {
        console.error('Error al obtener ubicaciones', error);
      }
    );
  }

  // Alternar el estado del label y resaltar la tarjeta
  toggleLabel(index: number): void {
    console.log('toggleLabel', index);
    const marcador = this.ubicaciones[index];
    marcador.mostrarLabel = !marcador.mostrarLabel; // Cambiar el estado del label

    // Verificar si hay que resaltar la tarjeta
    const tarjeta = this.cardContainer.nativeElement.querySelector(`#card-${index}`);
    if (tarjeta) {
      this.removeAllHighlights(); // Eliminar otros resaltados
      if (marcador.mostrarLabel) {
        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Desplazar la tarjeta a la vista
        tarjeta.classList.add('highlight'); // Añadir clase de resaltado
      }
    }
  }

  // Remover el resaltado de todas las tarjetas
  private removeAllHighlights(): void {
    const tarjetas = this.cardContainer.nativeElement.querySelectorAll('.card');
    tarjetas.forEach((tarjeta: HTMLElement) => tarjeta.classList.remove('highlight'));
  }
}
