import { Component, Input } from '@angular/core';
import { navItems } from './_nav';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './elementsTemplate.component.html'
})
export class ElementsTemplateComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private route: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  redirectToLogin()
  {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
