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
import { ListSeguimientosComponent } from './seguimientos_admin/componentes/list-seguimientos/list-seguimientos.component';
import { SeguimientoModule } from './seguimientos_admin/modulos/seguimiento.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AgregarSeguimientoComponent } from './seguimientos_admin/componentes/agregarSeguimiento/agregar-seguimiento/agregar-seguimiento.component';
import { VerSeguimientoComponent } from './seguimientos_admin/componentes/verSeguimiento/ver-seguimiento/ver-seguimiento.component';
import { EditarSeguimientoComponent } from './seguimientos_admin/componentes/editarSeguimiento/editar-seguimiento/editar-seguimiento.component';
import { EliminarSeguimientoComponent } from './seguimientos_admin/componentes/eliminarSeguimiento/eliminar-seguimiento/eliminar-seguimiento.component';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MyMatPaginatorInt} from './seguimientos_admin/componentes/traduccion/my-mat-paginator-int';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CrearTutorComponent } from './seguimientos_admin/componentes/tutores/crear-tutor/crear-tutor.component';
import {EditarTutorComponent}from './seguimientos_admin/componentes/tutores/editar-tutor/editar-tutor.component'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { SeguimientosTutorModule } from './seguimientos_tutor/modulos/seguimientos-tutor.module';
import { SeguimientoEstudianteModule } from './seguimiento_estudiante/modulos/seguimiento-estudiante.module';
import { ListarSeguimientoEstudianteComponent } from './seguimiento_estudiante/componentes/listar-seguimiento-estudiante/listar-seguimiento-estudiante.component';
import { ListarActividadesEstudianteComponent } from './seguimiento_estudiante/componentes/listar-actividades-estudiante/listar-actividades-estudiante.component';
import { VerSeguimientoEstudianteComponent } from './seguimiento_estudiante/componentes/ver-seguimiento-estudiante/ver-seguimiento-estudiante.component';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { VerActividadEstudianteComponent } from './seguimiento_estudiante/componentes/ver-actividad-estudiante/ver-actividad-estudiante.component';
import { ListarActividadesComponent } from './seguimientos_admin/componentes/listar-actividades/listar-actividades.component';
import { EditarActividadTutorComponent } from './seguimientos_tutor/componentes/editar-actividad-tutor/editar-actividad-tutor.component';
import { TutorModule } from './tutores/modulos/tutores.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AgregarActividadComponent } from './seguimientos_tutor/componentes/agregar-actividad/agregar-actividad.component';
import { VerSeguimientoTutorComponent } from './seguimientos_tutor/componentes/ver-seguimiento-tutor/ver-seguimiento-tutor.component';
import { ListActividadesTutorComponent } from './seguimientos_tutor/componentes/list-actividades-tutor/list-actividades-tutor.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
@NgModule({
  imports: [
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
    SeguimientosTutorModule,
    MatProgressBarModule,
    MatDialogModule,
    SeguimientoEstudianteModule,
    MatButtonModule,
    MatExpansionModule,
    TutorModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase)
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
    CrearTutorComponent,EditarTutorComponent,
    ListarActividadesEstudianteComponent,
    VerSeguimientoEstudianteComponent,
    VerActividadEstudianteComponent,
    ListarActividadesComponent,
    EditarActividadTutorComponent,
    AgregarActividadComponent,
    VerSeguimientoTutorComponent,
    ListActividadesTutorComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  { provide: MatPaginatorIntl, useClass: MyMatPaginatorInt},
  CrearTutorComponent, {provide: MatDialogRef, useValue: {}},
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
