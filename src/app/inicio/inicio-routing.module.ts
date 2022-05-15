import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
// import { EventFormComponent } from './event-form/event-form.component';
// import { EventDetailsComponent } from './event-details/event-details.component';
// import { EventIdGuard } from './guards/event-id.guard';
// import { LeavePageGuard } from './guards/leave-page.guard';
// import { EventResolver } from './resolver/event.resolver';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';

// import { EditEventGuard } from './guards/edit-event.guard';

const routes: Routes = [

  {
    path: 'inicio',
    canActivate: [LoginActivateGuard],
    component: InicioComponent,
  },
  // {
  //   path: 'events/add',
  //   canDeactivate: [LeavePageGuard],
  //   canActivate: [LoginActivateGuard],
  //   component: EventFormComponent,
  // },
  // {
  //   path: 'events/:id',
  //   component: EventDetailsComponent,
  //   canActivate: [EventIdGuard, LoginActivateGuard],
  //   resolve: {
  //     event: EventResolver
  //   }
  // },
  // {
  //   path: 'events/:id/edit',
  //   component: EventFormComponent,
  //   canActivate: [EventIdGuard, LoginActivateGuard],
  //   canDeactivate: [EditEventGuard],
  //   resolve: {
  //     event: EventResolver
  //   }
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
