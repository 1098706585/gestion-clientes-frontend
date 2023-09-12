import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementsRoutingModule } from './managements-routing.module';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ManagementsRoutingModule
  ]
})
export class ManagementsModule { }
