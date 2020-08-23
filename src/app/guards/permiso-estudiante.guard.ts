import { Injectable } from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {PermisosService} from './permisos.service';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class PermisoEstudianteGuard implements CanActivateChild {

  constructor(private permisosService: PermisosService, private router: Router) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('------ ' + this.permisosService.valor);
    this.permisosService.valor = sessionStorage.getItem('rol');
    if (this.permisosService.valor !== 'Estudiante') {
      console.log('No tiene acceso');
      // this.router.navigate(['/']);
      Swal.fire(
        'Permiso',
        'No tiene permiso para acceder a esta ruta',
        'error'
      );
      return false;
    }
    return true;
  }

}
