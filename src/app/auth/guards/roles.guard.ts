import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';
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
      console.log("En auth roles");

      // this will be passed from the route config on the data property
      const expectedRole = route.data['expectedRole'];
      console.log("Rol expected: " + expectedRole);

      const token = localStorage.getItem('token');
      // if (token) {
      //   let tokenPayload = decode(token); // decode the token to get its payload
      //   console.log(tokenPayload);
      // }

      const userRole = this.authService.getRole();


      if (!this.authService.isAuthenticated() ) { //|| tokenPayload.role !== expectedRole
        console.log("NO en el if");

        this.router.navigate(['/auth/login']);
        this.authService.loginChange$.next(false);
        // this.toastr.error('No autentificado');
        return false;
      }
      if (userRole !== expectedRole) {
        console.log("no permisos rol apto");
        this.router.navigate(['/inicio']);
        this.toastr.error('No Autorizado');
        return false;
      }
      console.log("OK en el if");
      this.authService.loginChange$.next(true);
      return true;
    }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
