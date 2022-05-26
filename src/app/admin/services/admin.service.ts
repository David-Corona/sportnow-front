import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminURL = 'admin';

  constructor(private readonly http: HttpClient) { }


  getUsers(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get<any>(`${this.adminURL}/users?${filter}`);
  }

  createUser(user: any): Observable<any>{
    return this.http.post<any>(`${this.adminURL}/users`, user);
  }

  editUser(user: any): Observable<any>{
    return this.http.put<any>(`${this.adminURL}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any>{
    return this.http.delete<any>(`${this.adminURL}/users/${userId}`);
  }


  getActividades(): Observable<any> {
    return this.http.get<any>(`${this.adminURL}/eventos`);
  }

  editActividad(actividad: any): Observable<any>{
    return this.http.put<any>(`${this.adminURL}/eventos/${actividad.id}`, actividad);
  }

  deleteActividad(actividadId: number): Observable<any>{
    return this.http.delete<any>(`${this.adminURL}/eventos/${actividadId}`);
  }






}
