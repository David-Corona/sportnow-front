import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UsersFormComponent } from './users-form/users-form.component';
import { DeportesComponent } from './deportes/deportes.component';
import { DeportesFormComponent } from './deportes-form/deportes-form.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadesFormComponent } from './actividades-form/actividades-form.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    DeportesComponent,
    DeportesFormComponent,
    ActividadesComponent,
    ActividadesFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class AdminModule { }
