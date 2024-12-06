import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [GoogleMapsModule,CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  center: google.maps.LatLngLiteral = { lat: 21.885454, lng: -102.3023701 };
  zoom = 12;

  icon: google.maps.Icon = {
    url: 'https://cdn-icons-png.flaticon.com/512/416/416610.png',
    scaledSize: new google.maps.Size(30, 30),
  };

  ubicaciones: {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    email: string;
    id: number;
    ubicacion: { latitud: number; longitud: number; activo: boolean };
    mostrarLabel: boolean;
  }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUbicaciones();
    setInterval(() => {
      this.getUbicaciones();
    }, 30000);
  }

  getUbicaciones(): void {
    this.http.get<any[]>('http://localhost:3000/ver-ubicaciones').subscribe(
      (response) => {
        this.ubicaciones = response.map((conductor) => ({
          ...conductor,
          mostrarLabel: false,
        }));
      },
      (error) => {
        console.error('Error al obtener ubicaciones', error);
      }
    );
  }

  toggleLabel(index: number): void {
    const marcador = this.ubicaciones[index];
    marcador.mostrarLabel = !marcador.mostrarLabel;

    if (marcador.mostrarLabel && this.cardContainer) {
      const tarjeta = this.cardContainer.nativeElement.querySelector(`#card-${index}`);

      if (tarjeta) {
        this.removeAllHighlights();
        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' });
        tarjeta.classList.add('highlight');
        setTimeout(() => tarjeta.classList.remove('highlight'), 20000);
      }
    }
  }

  private removeAllHighlights(): void {
    const tarjetas = this.cardContainer.nativeElement.querySelectorAll('.card');
    tarjetas.forEach((tarjeta: HTMLElement) => tarjeta.classList.remove('highlight'));
  }
}
