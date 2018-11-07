import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';



@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
  {
    const idToken = sessionStorage.getItem('token');
    if (idToken)
    {
      const reqClone = req.clone(
        {
          headers: req.headers.set('Authorization', sessionStorage.getItem('token'))
        }
      ) ;
      return next.handle(reqClone);
    }
    else{
      return next.handle(req);
    }
  }
}
