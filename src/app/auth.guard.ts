import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  try {
    // Verifica si localStorage está disponible
    if (typeof window !== 'undefined' && localStorage) {
      const usuario = localStorage.getItem('usuario');
      if (usuario) {
        return true; // Permite el acceso si el usuario está autenticado
      }
    }
  } catch (error) {
    console.error('Error accediendo a localStorage:', error);
  }

  // Redirige al login si no está autenticado
  router.navigate(['/login']);
  return false;
};
