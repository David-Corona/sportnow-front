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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoDetailsComponent } from './contacto-details/contacto-details.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsComponent } from './logs/logs.component';
import { BooleanoPipe } from './pipes/booleano.pipe';
import { ParticipantesFormComponent } from './participantes-form/participantes-form.component';
import { MensajesFormComponent } from './mensajes-form/mensajes-form.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    DeportesComponent,
    DeportesFormComponent,
    ActividadesComponent,
    SidebarComponent,
    ContactoComponent,
    ContactoDetailsComponent,
    ParticipantesComponent,
    MensajesComponent,
    DashboardComponent,
    LogsComponent,
    BooleanoPipe,
    ParticipantesFormComponent,
    MensajesFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SweetAlert2Module,
  ]
})
export class AdminModule { }
