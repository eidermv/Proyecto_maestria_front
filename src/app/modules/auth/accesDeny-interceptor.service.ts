import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';



@Injectable()
export class AccesDenyInterceptorService implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
  {
    return next.handle(req).do(
     (event: any) => {},
     (error: any) =>
                    {
                      if(error.status == 403)
                      {
                        let aux = error.url.split('/');// tomo el nombre del servicio para no usarlo en el login
                        console.log(aux[3]);
                        if(aux[3] != 'login')
                        {
                          sessionStorage.clear();
                          this.route.navigate(['/login']);
                        }
                      }
                    }
    );
  }
}
