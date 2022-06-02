import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {

      const expectedRole = route.data['expectedRole'];
      const userRole = this.authService.getRole();

      if (!this.authService.isAuthenticated() ) {
        this.router.navigate(['/auth/login']);
        this.authService.loginChange$.next(false);
        return false;
      }
      if (userRole !== expectedRole) {
        this.router.navigate(['/inicio']);
        this.toastr.error('No Autorizado');
        return false;
      }
      this.authService.loginChange$.next(true);
      return true;
    }

}
