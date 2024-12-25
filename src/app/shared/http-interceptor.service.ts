import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the ngrok header to it
    const clonedRequest = req.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': '69420'
      }
    });

    // Pass the cloned request to the next handler
    return next.handle(clonedRequest);
  }
}