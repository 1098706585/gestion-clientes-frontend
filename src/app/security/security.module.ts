import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutes } from './security.routing';
import { LogoutComponent } from './logout/logout.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SecurityRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RecaptchaModule, // este es el módulo principal recaptcha
    RecaptchaFormsModule
  ]
})
export class SecurityModule { }