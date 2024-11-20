import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, getLocaleNumberFormat } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  isAuthenticated: boolean = false;
  userName: any = null;
  userId: any = null;
  // user = 'admin'; //falta configuracion de usuarios
  userType: string | null = null;

  constructor(private router: Router) {
  }


  ngOnInit() {
    
  }
  
  LogOut(){


  }

  isSidebarOpen = false;
  isMiniSidebar = false;
  isDarkMode = false;

  //items nombre y ruta de los modulos
  navItems = [
    { label: 'Registrar-Conductor ', ruta: '/menu/Registrar-Conductor' },
    { label: 'Registrar-Gruas',ruta: '/menu/Registrar-Gruas'  },
    { label: 'Usuarios',ruta: '/menupr/moduloUsers'  },
    { label: 'Subir CSV',ruta: '/menupr/modulo3' },
    { label: 'Bitácora' ,ruta: '/menupr/modulo4'},
    { label: 'Perfil' ,ruta: 'menupr/modulo5'},
    { label: 'Administrador' ,ruta: 'menupr/Administrador'},
    { label: 'Modulo-Visitas', ruta: 'menupr/Modulo-Visitas'},
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (window.innerWidth <= 320) {
      this.isMiniSidebar = this.isSidebarOpen;
    }
  }

  toggleMiniSidebar() {
    this.isMiniSidebar = !this.isMiniSidebar;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}
