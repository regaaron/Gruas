import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegistrarConductorComponent } from './registrar-conductor/registrar-conductor.component';
import { RegistrarGruasComponent } from './registrar-gruas/registrar-gruas.component';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { ViajesComponent } from './viajes/viajes.component';
import { MapaComponent } from './mapa/mapa.component';
import { ModuloConductorComponent } from './modulo-conductor/modulo-conductor.component';
import { ModuloGruasComponent } from './modulo-gruas/modulo-gruas.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
   
    {
        path: 'menu',
        component: MenuComponent, canActivate: [authGuard], 
        children: [
          { path: '' ,component: ModuloConductorComponent},
          {path: 'Modulo-Conductor', component: ModuloConductorComponent},
          {path:'Modulo-Gruas', component: ModuloGruasComponent},
          {path:'Clientes', component:ClientesComponent },
          {path: 'Viajes', component: ViajesComponent},
          {path: 'Ventas', component: VentasComponent},
          {path: 'Mapa', component: MapaComponent},
            { path: '', redirectTo: 'Modulo-Conductor', pathMatch: 'full' }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

];
