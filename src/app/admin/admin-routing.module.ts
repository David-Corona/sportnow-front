import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { SportResolver } from '../sports/resolvers/sport.resolver';
import { SportFormComponent } from '../sports/sport-form/sport-form.component';
import { UserResolver } from '../users/resolvers/user.resolver';
import { ActividadesFormComponent } from './actividades-form/actividades-form.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users/users.component';



const routes: Routes = [


  {
    path: 'admin/usuarios',
    canActivate: [LoginActivateGuard],
    component: UsersComponent
  },
  {
    path: 'admin/usuarios/nuevo',
    canActivate: [LoginActivateGuard],
    component: UsersFormComponent
  },
  {
    path: 'admin/usuarios/:id',
    canActivate: [LoginActivateGuard],
    component: UsersFormComponent,
    resolve: {
      user: UserResolver
    },
  },

  {
    path: 'admin/actividades',
    canActivate: [LoginActivateGuard],
    component: ActividadesComponent
  },
  {
    path: 'admin/actividades/:nuevo',
    canActivate: [LoginActivateGuard],
    component: SportFormComponent
  },
  {
    path: 'admin/actividades/editar/:id',
    canActivate: [LoginActivateGuard],
    component: SportFormComponent,
    resolve: {
      event: SportResolver
    }
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
