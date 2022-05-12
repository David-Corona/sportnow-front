import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { UsersComponent } from './users/users.component';



const routes: Routes = [
  {
    path: 'admin/users',
    canActivate: [LoginActivateGuard],
    component: UsersComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
