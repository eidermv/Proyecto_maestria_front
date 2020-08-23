import { Component, Input } from '@angular/core';
import { navAdministrator } from './_navAdministrator';
import { navStudent} from './_navStudent';
import { Route, Router } from '@angular/router';
import { StringApp } from '../../resources/stringApp';
import { navTutor } from './_navTutor';

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
  constructor(private route: Router) {

    if (sessionStorage.getItem('rol') === this.stringApp.COORDINATOR) {
      this.navItems = navAdministrator;
    } else if (sessionStorage.getItem('rol') === this.stringApp.STUDENT){
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
    this.route.navigate(['/login']);
  }



}
