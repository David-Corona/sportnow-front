import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutActivateGuard } from './guards/logout-activate.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [LogoutActivateGuard],
    component: LoginComponent
  },
  {
    path: 'auth/register',
    canActivate: [LogoutActivateGuard],
    component: RegisterComponent
  },
  {
    path: 'auth/forgot-password',
    canActivate: [LogoutActivateGuard],
    component: ForgotPasswordComponent
  },
  {
    path: 'auth/reset-password/:token',
    canActivate: [LogoutActivateGuard],
    component: ResetPasswordComponent
  },
  { path: '', redirectTo: '/sports', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
