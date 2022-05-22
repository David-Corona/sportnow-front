import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportDetailsComponent } from './sport-details/sport-details.component';
import { SportFormComponent } from './sport-form/sport-form.component';


// import { EventIdGuard } from './guards/event-id.guard';
// import { LeavePageGuard } from './guards/leave-page.guard';

import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { SportResolver } from './resolvers/sport.resolver';


// import { EditEventGuard } from './guards/edit-event.guard';

const routes: Routes = [

  {
    path: 'actividades',
    canActivate: [LoginActivateGuard],
    component: SportListComponent,
  },
  {
    path: 'actividades/nuevo',
    // canDeactivate: [LeavePageGuard],
    canActivate: [LoginActivateGuard],
    component: SportFormComponent,
  },
  {
    path: 'actividades/:id',
    component: SportDetailsComponent,
    canActivate: [LoginActivateGuard], //EventIdGuard
    resolve: {
      event: SportResolver
    }
  },
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
export class SportsRoutingModule { }
