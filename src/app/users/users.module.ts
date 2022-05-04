import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
