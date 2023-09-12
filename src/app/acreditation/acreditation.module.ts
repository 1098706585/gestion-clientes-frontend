import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AcreditationRoutes } from './acreditation.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { NewAcreditationComponent } from './new-acreditation/new-acreditation.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
  declarations: [
    NewAcreditationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AcreditationRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
  ]
})
export class AcreditationModule { }
