import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from '../auth/guards/login-activate.guard';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {
    path: 'contacto',
    canActivate: [LoginActivateGuard],
    component: ContactoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
