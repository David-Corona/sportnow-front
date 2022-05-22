import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './resolvers/user.resolver';



const routes: Routes = [
  {
    path: 'usuarios/me',
    canActivate: [LoginActivateGuard],
    component: ProfileComponent,
    resolve: {
      user: UserResolver
    },
    // data: { animation: 3 }
  },
  {
    path: 'usuarios/edit',
    canActivate: [LoginActivateGuard],
    component: EditComponent,
    resolve: {
      user: UserResolver
    },
  },
  {
    path: 'usuarios/:id',
    canActivate: [LoginActivateGuard],
    component: ProfileComponent,
    resolve: {
      user: UserResolver
    }
  },
  // { path: '', redirectTo: '/me', pathMatch: 'full' },
  // { path: '**', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
