import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { SportsModule } from './sports/sports.module';
import { InicioModule } from './inicio/inicio.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// import { InicioComponent } from './inicio/inicio/inicio.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { MatTableModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    // InicioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    UsersModule,
    AdminModule,
    SportsModule,
    InicioModule,

    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiY29yb25hMTIxIiwiYSI6ImNrdnY2aDJpYzE4ZmsycG05Mno5dG91bzkifQ.EEQR8Z-qXQfxkmFRTuKHOQ'
    }),
    NgxMapboxGlGeocoderControlModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
