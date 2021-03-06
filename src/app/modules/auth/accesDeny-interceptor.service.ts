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
    return next.handle(req).do(
     (event: any) => {},
     (error: any) => {
                      if (error.status === 403) {
                        const aux = error.url.split('/'); // tomo el nombre del servicio para no usarlo en el login

                        if (aux[3] !== 'login') {
                          sessionStorage.clear();
                          this.permiso.limpiarServicio();
                          this.route.navigate(['/login']);
                        }
                      }
                      if (error.status === 401) {

                        sessionStorage.clear();
                        this.permiso.limpiarServicio();
                        this.route.navigate(['404']);
                      }
                    }
    );
  }
}
