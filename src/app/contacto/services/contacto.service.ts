import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private contactURL = 'contacto';

  constructor(private readonly http: HttpClient) { }


  postContacto(contacto: any): Observable<any> {
    return this.http.post(this.contactURL, contacto)
  }

}
