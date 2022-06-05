import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportService {

  private sportURL = 'eventos';

  constructor(private readonly http: HttpClient) { }

  getActividades(userId?: number, filtro = ""): Observable<any> { //
    const user = userId ? `user_id=${userId}` : "";
    const filter = filtro.length > 0 ? filtro : "";
    return this.http.get<any>(this.sportURL+'?'+user+filter);
  }

  getHistorial(userId?: number): Observable<any> {
    const user = userId ? `?user_id=${userId}` : "";
    return this.http.get<any>(`${this.sportURL}-historial`+user);
  }

  getProximasActividades(limite?: number): Observable<any> {
    const limite2 = limite ? `limite=${limite}` : "";
    return this.http.get(`${this.sportURL}-proximas`+'?'+limite2);
  }

  getActividad(id?: number): Observable<any> {
    return this.http.get<any>(`${this.sportURL}/${id}`);
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

  postComentario(evento: number,comentario: string): Observable<any> {
    return this.http.post(`${this.sportURL}`+"-comentarios", {"evento_id": evento, "mensaje": comentario})
  }

}
