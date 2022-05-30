import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportCardComponent } from './sport-card/sport-card.component';
import { FormsModule } from '@angular/forms';
import { SportCardRoutingModule } from './sport-card-routing.module';



@NgModule({
  declarations: [
    SportCardComponent
  ],
  imports: [
    CommonModule,
    SportCardRoutingModule,
    FormsModule
  ],
  exports: [
    SportCardComponent,
  ]
})
export class SportCardModule { }
