import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { SportsModule } from './sports/sports.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MenuModule,
    UsersModule,
    AdminModule,
    SportsModule,

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
