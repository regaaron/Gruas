import { Component } from '@angular/core';
import { RegistrarGruasComponent } from "../registrar-gruas/registrar-gruas.component";
import { VerGruasComponent } from "../ver-gruas/ver-gruas.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modulo-gruas',
  standalone: true,
  imports: [RegistrarGruasComponent, VerGruasComponent,CommonModule],
  templateUrl: './modulo-gruas.component.html',
  styleUrl: './modulo-gruas.component.css'
})
export class ModuloGruasComponent {
  // Variable para manejar qué componente se muestra
componenteActual: string = 'Registrar-Grua'; // Inicialmente mostrar "Registrar-Grua"

// Función para cambiar el componente actual
mostrarComponente(componente: string) {
  this.componenteActual = componente;
}
}
