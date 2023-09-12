import { Routes } from '@angular/router';
import { NewAcreditationComponent } from './new-acreditation/new-acreditation.component';

export const AcreditationRoutes: Routes = 
[
    {
        path: '',
        children: [ 
            {
                path: 'newAcreditation',
                component: NewAcreditationComponent
            }                               
            
        ]
    }
];