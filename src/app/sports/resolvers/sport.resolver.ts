import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, EMPTY } from 'rxjs';
import { SportService } from '../services/sport.service';

@Injectable({
  providedIn: 'root'
})
export class SportResolver implements Resolve<any> {

  constructor(
    private sportService: SportService,
    private router: Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.sportService.getEvento(+route.params['id']).pipe(
      catchError((error) => {
        this.router.navigate(['/inicio']);
        return EMPTY;
      })
    );
  }


}
