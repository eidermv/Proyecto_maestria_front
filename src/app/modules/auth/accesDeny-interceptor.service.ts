import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import {PermisosService} from '../../guards/permisos.service';



@Injectable()
export class AccesDenyInterceptorService implements HttpInterceptor {

  constructor(private route: Router, private permiso: PermisosService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('------------ 1 ' + JSON.stringify(req));
    return next.handle(req).do(
     (event: any) => {},
     (error: any) => {
                      if (error.status === 403) {
                        const aux = error.url.split('/'); // tomo el nombre del servicio para no usarlo en el login
                        console.log(aux[3]);
                        if (aux[3] !== 'login') {
                          sessionStorage.clear();
                          this.permiso.limpiarServicio();
                          this.route.navigate(['/login']);
                        }
                      }
                      if (error.status === 401) {
                        console.log('tutor quiere logearse' + this.permiso.valor);
                        sessionStorage.clear();
                        this.permiso.limpiarServicio();
                        this.route.navigate(['404']);
                      }
                    }
    );
  }
}
