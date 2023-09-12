import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

export const DashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'inicio',
        component: InicioComponent
    }]
}
];
