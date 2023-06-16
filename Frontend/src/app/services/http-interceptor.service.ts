import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem("token");

    console.log(token);
  
      const modifiedReq = req.clone({ 
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })

    return next.handle(modifiedReq);
  }
}
