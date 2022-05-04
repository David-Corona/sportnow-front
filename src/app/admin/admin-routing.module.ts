import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LogoutActivateGuard } from './guards/logout-activate.guard';
// import { LoginComponent } from './login/login.component';



const routes: Routes = [
  // {
  //   path: 'auth/login',
  //   canActivate: [LogoutActivateGuard],
  //   component: LoginComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
