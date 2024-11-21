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

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
   
    {
        path: 'menu',
        component: MenuComponent, 
        children: [
          { path: '' ,component: ModuloConductorComponent},
          {path: 'Modulo-Conductor', component: ModuloConductorComponent},
          {path:'Registrar-Gruas', component: RegistrarGruasComponent},
          {path:'Clientes', component:ClientesComponent },
          {path: 'Viajes', component: ViajesComponent},
          {path: 'Ventas', component: VentasComponent},
          {path: 'Mapa', component: MapaComponent},
            { path: '', redirectTo: 'Modulo-Conductor', pathMatch: 'full' }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

];
