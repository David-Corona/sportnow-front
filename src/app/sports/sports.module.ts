import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportsRoutingModule } from './sports-routing.module';
import { SportDetailsComponent } from './sport-details/sport-details.component';
import { SportFormComponent } from './sport-form/sport-form.component';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SportCardModule } from '../sport-card/sport-card.module';


@NgModule({
  declarations: [
    SportListComponent,
    SportDetailsComponent,
    SportFormComponent,
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    FormsModule,
    SportCardModule,
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule,
    SweetAlert2Module,
  ]
})
export class SportsModule { }
