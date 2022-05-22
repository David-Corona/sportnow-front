import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportService {

  private sportURL = 'eventos';

  constructor(private readonly http: HttpClient) { }

  getActividades(): Observable<any> {
    return this.http.get<any>(this.sportURL);
    // return resp.pipe(map(resp => resp.users));
  }

  getActividad(id?: number): Observable<any> {
    return this.http.get<any>(`${this.sportURL}/${id}`);
    // return resp.pipe(map(resp => resp.user));
  }

  createActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.sportURL}`, actividad);
  }




  postComentario(evento: number,comentario: string): Observable<any> { // user: number, //"user_id": user,
    return this.http.post(`${this.sportURL}`+"-comentarios", {"evento_id": evento, "mensaje": comentario})
    // .pipe(
    //   map(resp => resp.users))
  }



}
