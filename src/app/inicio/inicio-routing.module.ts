import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';


const routes: Routes = [
  {
    path: 'inicio',
    canActivate: [LoginActivateGuard],
    component: InicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
