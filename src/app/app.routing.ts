import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AdminGuardService } from './services/admin-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
        canActivate: [AdminGuardService]
    }, 
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }, {
                path: 'acreditation',
                loadChildren: () => import('./acreditation/acreditation.module').then(m => m.AcreditationModule)
            },{
                path: 'acreditation2',
                loadChildren: () => import('./acreditation/acreditation.module').then(m => m.AcreditationModule)
            },{
                path: 'acreditation3',
                loadChildren: () => import('./acreditation/acreditation.module').then(m => m.AcreditationModule)
            },
        ],
        canActivate: [AdminGuardService]
    },
    
    {
        path: '',
        component: AuthLayoutComponent,
        children: 
        [
            {
                path: 'security',
                loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
            }  
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: 
        [
            {
                path: 'sidebar',
                loadChildren: () => import('./sidebar/sidebar.module').then(m => m.SidebarModule)
            }  
        ]
    },
];