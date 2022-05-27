import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportService {

  private sportURL = 'eventos';

  constructor(private readonly http: HttpClient) { }

  getActividades(userId?: number, filtro = ""): Observable<any> { //
    const user = userId ? `user_id=${userId}` : "";
    const filter = filtro.length > 0 ? filtro : "";
    console.log(this.sportURL+'?'+user+filter);

    return this.http.get<any>(this.sportURL+'?'+user+filter);  //?${filter}
    // return resp.pipe(map(resp => resp.users));
  }

  getHistorial(userId?: number): Observable<any> {
      const user = userId ? `?user_id=${userId}` : "";
      return this.http.get<any>(`${this.sportURL}-historial`+user);
  }

  getProximasActividades(): Observable<any>  {
    return this.http.get(`${this.sportURL}-proximas`);
  }

  getActividad(id?: number): Observable<any> {
    return this.http.get<any>(`${this.sportURL}/${id}`);
    // return resp.pipe(map(resp => resp.user));
  }

  createActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.sportURL}`, actividad);
  }

  apuntarActividad(evento_id: number, user_id?: number) {
    return this.http.post(`${this.sportURL}-usuarios`, {'evento_id': evento_id, 'user_id': user_id})
  }


  desapuntarActividad(evento_id: number, user_id?: number) {
    const user = user_id ? "${user_id}" : "";
    return this.http.delete(`${this.sportURL}-usuarios/${evento_id}`+user)
  }


  postComentario(evento: number,comentario: string): Observable<any> { // user: number, //"user_id": user,
    return this.http.post(`${this.sportURL}`+"-comentarios", {"evento_id": evento, "mensaje": comentario})
    // .pipe(
    //   map(resp => resp.users))
  }



}
