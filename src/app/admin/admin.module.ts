import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    UsersComponent
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
