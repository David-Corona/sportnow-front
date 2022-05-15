import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportsRoutingModule } from './sports-routing.module';
import { SportDetailsComponent } from './sport-details/sport-details.component';


@NgModule({
  declarations: [
    SportListComponent,
    SportDetailsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    // FormsModule,
    // FontAwesomeModule,
    // SweetAlert2Module,
    // NgxMapboxGLModule,
    // NgxMapboxGlGeocoderControlModule,
  ]
})
export class SportsModule { }
