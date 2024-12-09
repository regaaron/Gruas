import { Component, AfterViewInit, NgZone} from '@angular/core';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent {
  map!: google.maps.Map;
  origen!: google.maps.LatLng | null;
  destino!: google.maps.LatLng | null;
  distancia: string = 'No calculada';
  origenDireccion: string = 'No seleccionado';
  destinoDireccion: string = 'No seleccionado';
  markers: google.maps.Marker[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 19.432608, lng: -99.133209 },
      zoom: 14,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

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
          this.calcularDistancia();
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

  calcularDistancia(): void {
    if (this.origen && this.destino) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [this.origen],
          destinations: [this.destino],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response?.rows[0].elements[0]) {
            const distanceText = response.rows[0].elements[0].distance.text;
            this.ngZone.run(() => {
              this.distancia = distanceText; // Asegura que Angular detecte el cambio
            });
          } else {
            console.error('Error al calcular distancia:', status);
            this.ngZone.run(() => {
              this.distancia = 'Error al calcular'; // Actualiza el texto de error
            });
          }
        }
      );
    }
  }

  resetViaje(): void {
    this.origen = null;
    this.destino = null;
    this.origenDireccion = 'No seleccionado';
    this.destinoDireccion = 'No seleccionado';
    this.distancia = 'No calculada';

    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }
}
