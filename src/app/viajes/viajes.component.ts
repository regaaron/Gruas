import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, NgZone } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent {
  viajes: any[] = [];
  map!: google.maps.Map;
  origen!: google.maps.LatLng | null;
  destino!: google.maps.LatLng | null;
  distancia: string = 'No calculada';
  origenDireccion: string = 'No seleccionado';
  destinoDireccion: string = 'No seleccionado';
  markers: google.maps.Marker[] = [];
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;
  selectedViaje: any | null = null; // Viaje seleccionado actualmente

  constructor(private ngZone: NgZone, private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.getViajes();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 21.88234, lng: -102.28259 }, // Coordenadas de Aguascalientes
      zoom: 14,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Inicializar servicios de direcciones
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      const latlng = event.latLng;
      if (latlng) {
        this.handleMapClick(latlng);
      }
    });
  }

  handleMapClick(latlng: google.maps.LatLng): void {
    this.ngZone.run(() => {
      if (!this.origen) {
        this.origen = latlng;
        this.convertirACalleYNumero(latlng, (address) => {
          this.origenDireccion = address;
          this.addMarker(latlng, 'Origen', true);
        });
      } else if (!this.destino) {
        this.destino = latlng;
        this.convertirACalleYNumero(latlng, (address) => {
          this.destinoDireccion = address;
          this.addMarker(latlng, 'Destino', false);
          this.calcularRuta();
        });
      }
    });
  }

  convertirACalleYNumero(latlng: google.maps.LatLng, callback: (address: string) => void): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        callback(results[0].formatted_address);
      } else {
        console.error('Error al obtener la dirección:', status);
        callback('Dirección no disponible');
      }
    });
  }

  addMarker(latlng: google.maps.LatLng, label: string, isOrigen: boolean): void {
    const marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      label: label,
    });
    this.markers.push(marker);
  }

  calcularRuta(): void {
    if (this.origen && this.destino) {
      const request: google.maps.DirectionsRequest = {
        origin: this.origen,
        destination: this.destino,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer.setDirections(result);

          // Obtener distancia del resultado
          const route = result.routes[0];
          const leg = route.legs[0];
          this.ngZone.run(() => {
            this.distancia = leg.distance?.text || 'No disponible';
            console.log(`Distancia calculada: ${this.distancia}`);
          });
        } else {
          console.error('Error al calcular la ruta:', status);
          this.ngZone.run(() => {
            this.distancia = 'Error al calcular';
          });
        }
      });
    }
  }

  getViajes(): void {
    this.http.get('http://localhost:3000/ver-viajes').subscribe(
      (response: any) => {
        this.viajes = response;
      },
      (error: any) => {
        Swal.fire('Error', "No se pudo cargar los viajes", error);
        console.log(error);
      }
    );
  }

  onSelectViaje(viaje: any): void {
    this.selectedViaje = viaje;

    // Eliminar los marcadores actuales
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    // Establecer origen y destino con las coordenadas de los viajes seleccionados
    this.origen = new google.maps.LatLng(viaje.viaje.origen.latitud, viaje.viaje.origen.longitud);
    this.destino = new google.maps.LatLng(viaje.viaje.destino.latitud, viaje.viaje.destino.longitud);

    // Actualizar las direcciones
    this.convertirACalleYNumero(this.origen, address => this.origenDireccion = address);
    this.convertirACalleYNumero(this.destino, address => this.destinoDireccion = address);

    // Calcular la ruta
    this.calcularRuta();
  }

  resetViaje(): void {
    this.origen = null;
    this.destino = null;
    this.origenDireccion = 'No seleccionado';
    this.destinoDireccion = 'No seleccionado';
    this.distancia = 'No calculada';

    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    // Limpiar la ruta del mapa
    this.directionsRenderer.setDirections({ routes: [], request: { origin: '', destination: '', travelMode: google.maps.TravelMode.DRIVING } });
  }
}
