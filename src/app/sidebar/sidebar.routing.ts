import { Routes } from '@angular/router';

import { SidebarComponent } from './sidebar.component';

export const SidebarRoutes: Routes = [

    {
        path: '',
        children: [ {
            path: 'sidebar',
            component: SidebarComponent
        }]
    }
];
