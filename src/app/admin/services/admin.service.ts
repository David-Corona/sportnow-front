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


  // const getAllOffers = (page = null, filtro = "") => {
  //   let filter = filtro.length > 0 ? filtro : "";

  //   if (page != null)
  //     return httpClient.get(`${URL}?page=${page}${filter}`);

  //   return httpClient.get(`${URL}?${filter}`);
  // };


}
