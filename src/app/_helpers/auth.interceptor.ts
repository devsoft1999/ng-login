import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log("test=================================")
    let authReq = req;
    const token = this.token.getToken();
    console.log("token================================= :" ,token);

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }else{
        this.router.navigate(['']);

    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];