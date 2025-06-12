import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  center: google.maps.LatLngLiteral = { lat: 21.885454, lng: -102.3023701 };
  zoom = 12;

  conductores: any[] = [];
  usuarios: any[] = [];


  conductorIcon: google.maps.Icon = {
    url: 'https://cdn-icons-png.flaticon.com/512/416/416610.png',
    scaledSize: new google.maps.Size(30, 30),
  };

  usuarioIcon: google.maps.Icon = {
    url: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
    scaledSize: new google.maps.Size(30, 30),
  };

  ubicaciones: {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    email: string;
    id: number;
    tipo_usuario: string;
    // ubicacion: { latitud: number; longitud: number; activo: boolean };
    mostrarLabel: boolean;
    latitud: number;
    longitud: number;
  }[] = [];

  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUbicaciones();
    setInterval(() => {
      this.getUbicaciones();
    }, 30000);
  }

  ngAfterViewInit() {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap((window as any).googleMap);
  }


getUbicaciones(): void {
  this.http.get<any[]>('http://localhost:3000/api/mapa/usuarios').subscribe(
    (response) => {
      this.ubicaciones = response.map((persona) => ({
        ...persona,
        latitud: parseFloat(persona.latitud),
        longitud: parseFloat(persona.longitud),
        mostrarLabel: false,
      }));

      // Clasifica usuarios y conductores
      this.conductores = this.ubicaciones.filter(u => u.tipo_usuario === 'conductor');
      console.log('Conductores:', this.conductores);
      this.usuarios = this.ubicaciones.filter(u => u.tipo_usuario === 'cliente');
      console.log('Usuarios:', this.usuarios);
    },
    (error) => {
      console.error('Error al obtener ubicaciones', error);
    }
  );
}


  toggleLabel(index: number, tipo_usuario: 'conductor' | 'usuario'): void {
  const lista = tipo_usuario === 'conductor' ? this.conductores : this.usuarios;

  // Alterna mostrar label en la lista correcta
  lista[index].mostrarLabel = !lista[index].mostrarLabel;

  // También actualiza el array principal 'ubicaciones' para que el mapa refleje el cambio
  // Encontramos el índice real en ubicaciones para actualizar mostrarLabel
  const persona = lista[index];
  const idxEnUbicaciones = this.ubicaciones.findIndex(
    (u) => u.nombre === persona.nombre && u.latitud === persona.latitud && u.longitud === persona.longitud
  );
  if (idxEnUbicaciones !== -1) {
    this.ubicaciones[idxEnUbicaciones].mostrarLabel = lista[index].mostrarLabel;
  }

  if (lista[index].mostrarLabel && this.cardContainer) {
    const tarjetaId = tipo_usuario === 'conductor' ? `card-${index}` : `card-usuario-${index}`;
    const tarjeta = this.cardContainer.nativeElement.querySelector(`#${tarjetaId}`);
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

  traceRoute(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): void {
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('No se pudo calcular la ruta:', status);
      }
    });
  }

  seleccionado: google.maps.LatLngLiteral | null = null;

  seleccionarUbicacion(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.seleccionado = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log('Ubicación seleccionada:', this.seleccionado);
    }
  }
}
