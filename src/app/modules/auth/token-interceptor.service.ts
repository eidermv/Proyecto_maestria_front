import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';



@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) : Observable<HttpHeaderResponse>
  {
    return next.handle(req);
  }
}
