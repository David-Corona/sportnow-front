import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError, of, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { TokenResponse, UserResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'auth';
  private logged: boolean = false;
  loginChange$ = new ReplaySubject<boolean>(1)

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) { }


  login(userLogin: UserLogin): Observable<void> {
    const resp = this.http.post(`${this.authURL}/login`, userLogin);
    this.saveToken(resp);
    return of(undefined);
  }

  // receives observable token => saves in localstorage, logged & loginChange as true and relocate to sports. If not, show error.
  saveToken(resp: Observable<any>): void {
    resp.subscribe({
      next: (r) => {
        localStorage.setItem("token", r.access_token);
        this.logged = true;
        this.loginChange$.next(true);
        this.router.navigate(['/inicio']);
        this.toastr.success('¡Bienvenido ' + r.user.name + "!");
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Error al loguear');
      }
    });
  }

  register(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.authURL}/register`, userInfo).pipe(
      map(resp => resp)
    )
  }

  // TODO
  // manejarIsLogged(resp: Observable<any>): void {
  //   resp.subscribe({
  //     next: (r) => {
  //       console.log(r);
  //       if (r) {
  //         console.log("en if, true");
  //         this.logged = true;
  //         this.loginChange$.next(true);
  //       } else {
  //         console.log("en else, false");
  //         localStorage.removeItem("token");
  //       }

  //     },
  //     error: (error) => {
  //       console.log("en error, false");
  //       localStorage.removeItem("token");
  //       console.error(error);
  //     }
  //   });
  // }

  // TODO
  isLogged(): Observable<any> {
    console.log(this.logged);
    console.log(localStorage.getItem("token"));

    if (!this.logged && localStorage.getItem("token")===null) {
      return of(false);
    } else if (this.logged && localStorage.getItem("token")) {
      return of(true);
    } else if (!this.logged && localStorage.getItem("token")) { //TODO: problema cuando hay token caducado

      const validated = this.http.get((`${this.authURL}/validate`)) //TODO, siempre devuelve true
      console.log(validated);
      if(validated) {
        console.log("en true");
        this.logged = true;
        this.loginChange$.next(true);
        return of(true);
      } else {
        localStorage.removeItem("token");
        return of(false);
      }

      // const validated = this.http.get((`${this.authURL}/validate`))
      // this.manejarIsLogged(validated);
      // return validated;



    } else {
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    this.logged = false;
    this.loginChange$.next(false);
    this.router.navigate(['/auth/login']);
  }

  recoverPassword(email: String): Observable<any> {
    return this.http.post<any>(`${this.authURL}/forgot-password`, {"email": email}).pipe(
      map(resp => resp)
    )
  }

  resetPassword(password: String, token: String): Observable<any> {
    return this.http.post<any>(`${this.authURL}/reset-password`, {"password": password, "token": token}).pipe(
      map(resp => resp)
    )
  }



}
