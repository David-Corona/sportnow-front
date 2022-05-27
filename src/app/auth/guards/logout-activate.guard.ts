import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutActivateGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("LogoutGuard: Sí autentif");
      this.authService.loginChange$.next(false);
      this.router.navigate(['/inicio']);
      return false;
    }
    console.log("LogoutGuard: No autentif");
    return true;
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   this.authService.isLogged().subscribe({
  //     next: resp => {
  //       if (resp) {
  //         this.router.navigate(['/inicio']);
  //       }
  //     },
  //     error: error => console.error(error)
  //   });
  //   return true;

  // }

}
