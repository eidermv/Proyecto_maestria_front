import { Component, Input } from '@angular/core';
import { navAdministrator } from './_navAdministrator';
import { navStudent} from './_navStudent';
import {navTutor} from './_navTutor';
import { Route, Router } from '@angular/router';
import { StringApp } from '../../resources/stringApp';
import {PermisosService} from '../../guards/permisos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './elementsTemplate.component.html'
})
export class ElementsTemplateComponent {

  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  private stringApp: StringApp = new StringApp();
  constructor(private route: Router, private permisoService: PermisosService) {

    if (sessionStorage.getItem('rol') === this.stringApp.COORDINATOR && this.permisoService.valor === this.stringApp.COORDINATOR) {
      this.navItems = navAdministrator;
    } else if (sessionStorage.getItem('rol') === this.stringApp.STUDENT && this.permisoService.valor === this.stringApp.STUDENT) {
      this.navItems = navStudent;
    } else {
      this.navItems = navTutor;
    }

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  redirectToLogin() {
    sessionStorage.clear();
    this.permisoService.limpiarServicio();
    this.route.navigate(['/login']);
  }



}
