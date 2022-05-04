import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { SportsRoutingModule } from './sports/sports-routing.module';
import { UsersRoutingModule } from './users/users-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

const routes: Routes = [
  {
    path: 'sports',
    loadChildren: () => import('./sports/sports.module').then((m) => m.SportsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  { path: '', redirectTo: '/sports', pathMatch: 'full' },
  { path: '**', redirectTo: '/sports', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), AuthRoutingModule, SportsRoutingModule, UsersRoutingModule, AdminRoutingModule ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

