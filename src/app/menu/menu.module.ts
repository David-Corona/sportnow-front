import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuTopComponent } from './menu-top/menu-top.component';


@NgModule({
  declarations: [
    MenuTopComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuTopComponent
  ]
})
export class MenuModule { }
