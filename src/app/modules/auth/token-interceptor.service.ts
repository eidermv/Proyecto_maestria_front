import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaderResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';




@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = sessionStorage.getItem('token');
    console.log('------------ 2 ');
    const aux = req.url.split('.');
    if (aux[1] === 'geonames' ) {
      return next.handle(req);
    } else if (idToken) {
      const reqClone = req.clone(
        {
          headers: req.headers.set('Authorization', sessionStorage.getItem('token')),
        }
      ) ;
      return next.handle(reqClone);
    } else {
      return next.handle(req);

    }
    /**/
  }
}
