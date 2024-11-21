import { Component } from '@angular/core';
import { RegistrarConductorComponent } from "../registrar-conductor/registrar-conductor.component";
import { VerConductoresComponent } from "../ver-conductores/ver-conductores.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modulo-conductor',
  standalone: true,
  imports: [RegistrarConductorComponent, VerConductoresComponent,CommonModule],
  templateUrl: './modulo-conductor.component.html',
  styleUrl: './modulo-conductor.component.css'
})
export class ModuloConductorComponent {
// Variable para manejar qué componente se muestra
componenteActual: string = 'Registrar-Conductor'; // Inicialmente mostrar "Registrar-Conductor"

// Función para cambiar el componente actual
mostrarComponente(componente: string) {
  this.componenteActual = componente;
}
}
