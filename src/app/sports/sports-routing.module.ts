import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportDetailsComponent } from './sport-details/sport-details.component';
import { SportFormComponent } from './sport-form/sport-form.component';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { SportResolver } from './resolvers/sport.resolver';


const routes: Routes = [
  {
    path: 'actividades',
    canActivate: [LoginActivateGuard],
    component: SportListComponent,
  },
  {
    path: 'actividades/nuevo',
    canActivate: [LoginActivateGuard],
    component: SportFormComponent,
  },
  {
    path: 'actividades/:id',
    component: SportDetailsComponent,
    canActivate: [LoginActivateGuard],
    resolve: {
      event: SportResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
