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

  constructor(private router: Router) {
  }


  ngOnInit() {
    
  }
  

  isSidebarOpen = false;
  isMiniSidebar = false;
  isDarkMode = false;


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

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']); // Redirigir al login
  }
}
