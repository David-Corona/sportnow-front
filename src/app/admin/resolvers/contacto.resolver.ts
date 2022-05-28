import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, EMPTY } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class ContactoResolver implements Resolve<any> {

  constructor(
    private adminService: AdminService,
    private router: Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.adminService.getContacto(+route.params['id']).pipe(
      catchError((error) => {
        this.router.navigate(['/admin/contacto']);
        return EMPTY;
      })
    );
  }


}
