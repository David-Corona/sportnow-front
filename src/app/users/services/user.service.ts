import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AvatarResponse, UserResponse } from '../interfaces/responses';
import { User } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  constructor(private readonly http: HttpClient) { }

  getUser(id?: number): Observable<any> {
    let resp = null;
    if (id) { //if id is received by parameter
      resp = this.http.get<any>(`${this.userURL}/${id}`);
    } else { //if no id, then get user logged in (me)
      resp = this.http.get<any>(`${this.userURL}/me`);
    }
    // return resp.pipe(map(resp => resp.user));
    return resp;
  }

  // saveProfile(name: string, email: string): Observable<void> {
  //   return this.http.put<void>(`${this.userURL}/me`, {name: name, email: email});
  // }

  // savePhoto(avatar: string): Observable<string> {
  //   return this.http.put<AvatarResponse>(`${this.userURL}/me/photo`, {avatar: avatar}).pipe
  //     (map(resp => resp.avatar)
  //   );
  // }

  // savePassword(password: string): Observable<void> {
  //   return this.http.put<void>(`${this.userURL}/me/password`, {password: password});
  // }

}
