import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenResponse, UserResponse } from "../interfaces/responses";
import { User, UserLogin } from "../interfaces/user";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'auth';
  private logged: boolean = false;
  loginChange$ = new ReplaySubject<boolean>(1);
  role: string = "";

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public jwtHelper: JwtHelperService,
  ) { }

  login(userLogin: UserLogin): Observable<void> {
    const resp = this.http.post(`${this.authURL}/login`, userLogin);
    this.saveToken(resp);
    return of(undefined);
  }

  saveToken(resp: Observable<any>): void {
    resp.subscribe({
      next: (r) => {
        localStorage.setItem("token", r.access_token);
        localStorage.setItem('role', r.user.role);
        this.role = r.user.role;
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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token); // Comprueba si el token ha expirado, devuelve true/false
    } else {
      return false;
    }
  }

  getRole(){
    this.role = localStorage.getItem('role')!;
    return this.role;
  }

  register(userInfo: any): Observable<any> {
    return this.http.post<any>(`${this.authURL}/register`, userInfo).pipe(
      map(resp => resp)
    )
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem('role');
    this.logged = false;
    this.loginChange$.next(false);
    this.role = '';
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
