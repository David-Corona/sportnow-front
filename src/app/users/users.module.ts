import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    // FontAwesomeModule,
    // SweetAlert2Module,
    NgxMapboxGLModule
  ]
})
export class UsersModule { }
