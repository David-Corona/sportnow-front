import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

    canActivate(): boolean {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      this.authService.loginChange$.next(true);
      return true;
    }

}
