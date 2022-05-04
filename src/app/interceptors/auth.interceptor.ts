import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      const token = localStorage.getItem('token');
      if (token) {
        const authReq = request.clone({ // Clone the request to add the new header.
        headers: request.headers.set('Authorization', 'Bearer ' + token)});
        return next.handle(authReq); // Pass on the cloned request instead of the original request.
      }
    return next.handle(request);
  }
}
