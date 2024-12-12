import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el servicio Router
  const usuario = localStorage.getItem('usuario'); // Verifica si el usuario está autenticado

  if (usuario) {
    return true; // Permite el acceso si el usuario está autenticado
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }
};
