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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoDetailsComponent } from './contacto-details/contacto-details.component';
// import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    DeportesComponent,
    DeportesFormComponent,
    ActividadesComponent,
    ActividadesFormComponent,
    SidebarComponent,
    ContactoComponent,
    ContactoDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    // MatSidenavModule,
    MatSortModule,
    SweetAlert2Module,
  ]
})
export class AdminModule { }
