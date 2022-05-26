import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { UserResolver } from '../users/resolvers/user.resolver';
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





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
