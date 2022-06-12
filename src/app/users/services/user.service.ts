import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  constructor(private readonly http: HttpClient) { }

  getUser(id?: number): Observable<any> {
    let resp = null;
    if (id) { //si se recibe id
      resp = this.http.get<any>(`${this.userURL}/${id}`);
    } else {
      resp = this.http.get<any>(`${this.userURL}/me`);
    }
    return resp;
  }

  saveProfile(name: string, email: string): Observable<void> {
    return this.http.put<void>(`${this.userURL}/me`, {name: name, email: email});
  }

  savePhoto(data: any): Observable<any> {
    return this.http.post<any>(`${this.userURL}/me/avatar?_method=PUT`, data);
  }

  savePassword(password: string): Observable<void> {
    return this.http.put<void>(`${this.userURL}/me/password`, {password: password});
  }

}
