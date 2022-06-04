import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminURL = 'admin';

  constructor(private readonly http: HttpClient) { }


  // Usuarios
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


  // Actividades
  getActividades(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get<any>(`${this.adminURL}/eventos?${filter}`);
  }

  editActividad(actividad: any): Observable<any>{
    return this.http.put<any>(`${this.adminURL}/eventos/${actividad.id}`, actividad);
  }

  deleteActividad(actividadId: number): Observable<any>{
    return this.http.delete<any>(`${this.adminURL}/eventos/${actividadId}`);
  }

  getUltimasActividades(): Observable<any> {
    return this.http.get(`${this.adminURL}/eventos-ultimos`);
  }


  // Deportes
  getDeportes(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get(`${this.adminURL}/deportes?${filter}`);
  }

  getDeportesPopulares(): Observable<any> {
    return this.http.get(`${this.adminURL}/deportes-populares`);
  }

  // Participantes
  getParticipantes(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get(`${this.adminURL}/eventos-usuarios?${filter}`);
  }

  getUsuariosActivos(): Observable<any> {
    return this.http.get(`${this.adminURL}/eventos-usuarios-activos`);
  }

  // Mensajes
  getMensajes(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get(`${this.adminURL}/eventos-comentarios?${filter}`);
  }


  // Contactos
  getContactos(filtro = ""): Observable<any> {
    let filter = filtro.length > 0 ? filtro : "";
    return this.http.get(`${this.adminURL}/contacto?${filter}`);
  }

  getContacto(id: number): Observable<any> {
    return this.http.get(`${this.adminURL}/contacto/${id}`);
  }

  getUltimosContactos(): Observable<any> {
    return this.http.get<any>(`${this.adminURL}/contacto-ultimos`);
  }

    // Logs
    getLogs(filtro = ""): Observable<any> {
      let filter = filtro.length > 0 ? filtro : "";
      return this.http.get(`${this.adminURL}/logs?${filter}`);
    }


}
