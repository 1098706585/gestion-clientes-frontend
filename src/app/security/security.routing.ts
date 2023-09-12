import { Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

export const SecurityRoutes: Routes = [

    {
        path: '',
        children: [ 
        {
            path: 'logout',
            component: LogoutComponent
        }]
    }
];
