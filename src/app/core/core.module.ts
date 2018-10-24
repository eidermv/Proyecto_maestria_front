import {NgModule} from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {ElementsTemplateComponent} from './elementsTemplate/elementsTemplate.component';
import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
  } from '@coreui/angular';


import { AppRoutingModule } from '../app.routing';

@NgModule(
    {
        declarations :
        [
            ElementsTemplateComponent
        ],
        imports:
        [
            AppAsideModule,
            AppBreadcrumbModule.forRoot(),
            AppFooterModule,
            AppHeaderModule,
            AppSidebarModule,
            PerfectScrollbarModule,
            BsDropdownModule.forRoot(),
            AppRoutingModule
        ],
        exports :
        [
          AppRoutingModule,
          ElementsTemplateComponent
        ]
    }
)

export class CoreModule
{
}
