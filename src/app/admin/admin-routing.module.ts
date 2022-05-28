import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SportResolver } from '../sports/resolvers/sport.resolver';
import { SportFormComponent } from '../sports/sport-form/sport-form.component';
import { UserResolver } from '../users/resolvers/user.resolver';
import { ActividadesFormComponent } from './actividades-form/actividades-form.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ContactoDetailsComponent } from './contacto-details/contacto-details.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ContactoResolver } from './resolvers/contacto.resolver';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users/users.component';



const routes: Routes = [


  {
    path: 'admin/usuarios',
    // canActivate: [LoginActivateGuard],
    component: UsersComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/usuarios/nuevo',
    // canActivate: [LoginActivateGuard],
    component: UsersFormComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/usuarios/:id',
    // canActivate: [LoginActivateGuard],
    component: UsersFormComponent,
    resolve: {
      user: UserResolver
    },
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },

  {
    path: 'admin/actividades',
    // canActivate: [LoginActivateGuard],
    component: ActividadesComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/actividades/:nuevo',
    // canActivate: [LoginActivateGuard],
    component: SportFormComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/actividades/editar/:id',
    component: SportFormComponent,
    resolve: {
      event: SportResolver
    },
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },



  {
    path: 'admin/contacto',
    component: ContactoComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/contacto/:id',
    component: ContactoDetailsComponent,
    resolve: {
      contacto: ContactoResolver
    },
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
