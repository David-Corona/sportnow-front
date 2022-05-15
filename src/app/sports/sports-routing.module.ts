import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportListComponent } from './sport-list/sport-list.component';
import { SportDetailsComponent } from './sport-details/sport-details.component';
// import { EventFormComponent } from './event-form/event-form.component';
// import { EventDetailsComponent } from './event-details/event-details.component';
// import { EventIdGuard } from './guards/event-id.guard';
// import { LeavePageGuard } from './guards/leave-page.guard';
// import { SportResolver } from '../resolver/sport.resolver';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { SportResolver } from './resolvers/sport.resolver';

// import { EditEventGuard } from './guards/edit-event.guard';

const routes: Routes = [

  {
    path: 'sports',
    canActivate: [LoginActivateGuard],
    component: SportListComponent,
  },
  // {
  //   path: 'events/add',
  //   canDeactivate: [LeavePageGuard],
  //   canActivate: [LoginActivateGuard],
  //   component: EventFormComponent,
  // },
  {
    path: 'sports/:id',
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
