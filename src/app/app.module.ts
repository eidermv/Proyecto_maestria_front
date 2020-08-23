import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { RegisterComponent } from './views/register/register.component';


// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components

import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeekersModule } from './modules/seekers/seekers.module';
import { TokenInterceptorService } from './modules/auth/token-interceptor.service';
import { InternshipModule } from './modules/internship/internship.module';
import { ModalWindowsModule } from './modules/modal-windows/modal-windows.module';
import {ChartsModule} from 'ng2-charts';
import { ListSeguimientosComponent } from './seguimientos/componentes/list-seguimientos/list-seguimientos.component';
import { SeguimientoModule } from './seguimientos/modulos/seguimiento.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AgregarSeguimientoComponent } from './seguimientos/componentes/agregarSeguimiento/agregar-seguimiento/agregar-seguimiento.component';
import { VerSeguimientoComponent } from './seguimientos/componentes/verSeguimiento/ver-seguimiento/ver-seguimiento.component';
import { EditarSeguimientoComponent } from './seguimientos/componentes/editarSeguimiento/editar-seguimiento/editar-seguimiento.component';
import { EliminarSeguimientoComponent } from './seguimientos/componentes/eliminarSeguimiento/eliminar-seguimiento/eliminar-seguimiento.component';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorIntl} from '@angular/material/paginator'
import {MyMatPaginatorInt} from './seguimientos/componentes/traduccion/my-mat-paginator-int';
import {MatCardModule} from '@angular/material/card';
import{ReactiveFormsModule} from '@angular/forms'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CrearTutorComponent } from './tutores/crear-tutor/crear-tutor.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { SeguimientoEstudianteModule } from './seguimiento_estudiante/modulos/seguimiento-estudiante.module';
import { ListarSeguimientoEstudianteComponent } from './seguimiento_estudiante/componentes/listar-seguimiento-estudiante/listar-seguimiento-estudiante.component';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    ChartsModule,
    CoreModule,
    HttpClientModule,
    AuthModule,
    SeekersModule,
    ModalWindowsModule,
    BrowserAnimationsModule,
    InternshipModule,
    SeguimientoModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    SeguimientoEstudianteModule
  ],
  declarations: [
    AppComponent,
    P404Component,
    P500Component,
    RegisterComponent,
    ListSeguimientosComponent,
    AgregarSeguimientoComponent,
    VerSeguimientoComponent,
    EditarSeguimientoComponent,
    EliminarSeguimientoComponent,
    CrearTutorComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  { provide: MatPaginatorIntl, useClass: MyMatPaginatorInt},
  CrearTutorComponent, {provide: MatDialogRef, useValue: {}},
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
