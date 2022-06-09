import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SportResolver } from '../sports/resolvers/sport.resolver';
import { SportFormComponent } from '../sports/sport-form/sport-form.component';
import { UserResolver } from '../users/resolvers/user.resolver';
import { ActividadesComponent } from './actividades/actividades.component';
import { ContactoDetailsComponent } from './contacto-details/contacto-details.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeportesComponent } from './deportes/deportes.component';
import { LogsComponent } from './logs/logs.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ParticipantesFormComponent } from './participantes-form/participantes-form.component';
import { ParticipantesComponent } from './participantes/participantes.component';
import { ContactoResolver } from './resolvers/contacto.resolver';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },

  {
    path: 'admin/usuarios',
    component: UsersComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/usuarios/nuevo',
    component: UsersFormComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/usuarios/:id',
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
    component: ActividadesComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/actividades/:nuevo',
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
    path: 'admin/deportes',
    component: DeportesComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },

  {
    path: 'admin/participantes',
    component: ParticipantesComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  {
    path: 'admin/participantes/nuevo',
    component: ParticipantesFormComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: 'admin'
    }
  },

  {
    path: 'admin/mensajes',
    component: MensajesComponent,
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

  {
    path: 'admin/logs',
    component: LogsComponent,
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
