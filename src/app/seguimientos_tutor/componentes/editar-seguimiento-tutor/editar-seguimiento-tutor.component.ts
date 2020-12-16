import { EstadoProyectoCompleto } from './../../modelos/estadoProyectoCompleto.model';
import { TutorCompleto } from './../../modelos/tutorCompleto.model';
import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActividadesTutorServices } from './../../servicios/actividadesTutor.service';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { SeguimientosTutorServices } from './../../servicios/seguimientosTutor.service';
import { Seguimiento } from './../../../seguimientos_admin/modelos/seguimiento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarActividadTutorComponent } from '../editar-actividad-tutor/editar-actividad-tutor.component';
import { Tutor } from '../../../tutores/modelos/tutor.model';
import { Student } from '../../../models/student';
import { EstadoSeguimiento } from '../../modelos/estadoSeguimiento.model';
import { EstadoProyecto } from '../../modelos/estadosProyecto.model';
import { TipoSeguimiento } from '../../modelos/tipoSeguimiento.model';
import { TutorService } from '../../../tutores/servicios/tutor.service';
import { EstudianteService } from '../../../seguimientos_admin/servicios/estudiante.service';
import Swal from 'sweetalert2';
import { CrearTutorComponent } from '../../../seguimientos_admin/componentes/tutores/crear-tutor/crear-tutor.component';
import { AgregarActividadComponent } from '../agregar-actividad/agregar-actividad.component';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import {SeguimientoTutor} from '../../modelos/seguimientoTutor.model';
import { TutorTutorService } from '../../servicios/tutor-tutor.service';

@Component({
  selector: 'app-editar-seguimiento-tutor',
  templateUrl: './editar-seguimiento-tutor.component.html',
  styleUrls: ['./editar-seguimiento-tutor.component.css']
})
export class EditarSeguimientoTutorComponent implements OnInit {
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  actividades: ActividadTutor[] = [];
  dataSource = new MatTableDataSource(this.actividades);
  panelOpenState = false;
  seguimientoTutor: SeguimientoTutorCompleto;
  @Input() seguimiento: SeguimientoTutor;
  formulario: FormGroup;
  porcentaje: number;
  YEAR_END_COHORTE: number;
  options: TutorCompleto[] = [];
  optionsCohorte: Array<string>;
  options2: Student[] = [];
  optionsEstadoSeguimiento: EstadoSeguimiento[] = [];
  optionsEstadoProyecto: EstadoProyectoCompleto[] = [];
  optionsTiposSeguimiento: TipoSeguimiento[] = [];
  texto = '';
  objEspec: string[];
  @Output()banNotificaciones = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private seguimientoTutorService: SeguimientosTutorServices, private actividadesTutorService: ActividadesTutorServices,
    private tutorService: TutorTutorService, private estudianteService: EstudianteService) {
      this.seguimientoTutor=new SeguimientoTutorCompleto();
      this.estudianteService.onEstudiantes();
      this.YEAR_END_COHORTE = 2008;
      this.optionsCohorte = [];
      this.optionsEstadoSeguimiento = this.seguimientoTutorService.estadosSeguimientos();
      this.optionsTiposSeguimiento = this.seguimientoTutorService.tiposSeguimiento();
     }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.seguimientoTutor = new SeguimientoTutorCompleto();
    this.seguimientoTutor = this.seguimientoTutorService.seguimiento;
    this.dataSource = new MatTableDataSource(this.actividades);
    this.listarEstadosProyecto();
    const oe = '';
    const cont = 1;
    this.objEspec = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.seguimiento = this.seguimientoTutorService.Seguimiento[0];
    this.crearFormulario();
    this.getAllCohorte();
    this.options2 = this.estudianteService.estudiantes;

  }
  listarEstadosProyecto(){
    this.seguimientoTutorService.listarEstadosProyecto().subscribe((data) => {
      if (data.estado === 'exito') {
        data.data.forEach( (item) => {
          const estados: EstadoProyectoCompleto = item;
          this.optionsEstadoProyecto.push(estados);
        });
      }
    });
  }
  volver() {
    // this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);
    console.log('emitido: ');
  }
  async crearPDF() {

    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
  });
  pdf.info({
    title: 'Listado De Actividades',
    author: 'Universidad del Cauca',
    subject: 'Reporte',
});
const fecha = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
    pdf.pageMargins([ 100, 60, 40, 40 ]);
     pdf.header('\n\n.     \t\t' + fecha.toLocaleDateString('es-ES', options));
    pdf.add(new Txt('Listado de Actividades').alignment('center').bold().end );
    pdf.add(new Txt('Seguimiento:  ' + this.seguimiento.nombre).end );
    pdf.add(new Txt('Tutor:  ' + this.seguimiento.tutor).end );
    pdf.add(new Txt('Estudiante:  ' + this.seguimiento.estudiante).end );
    pdf.add('\n\n\n'); /*
    pdf.watermark('UNIVERSIDAD DEL CAUCA');  */

    pdf.add(this.crearTabla());
    pdf.create().download();
  }
  crearTabla() {
    const body: any[] = [];
    let contf = 1;
    let contc = 0;
    const fila1: any[] = [];
    fila1[contc] = 'Semana'; contc++;
    fila1[contc] = 'Fecha Inicio'; contc++;
    fila1[contc] = 'Fecha Entrega'; contc++;
    fila1[contc] = 'Entregas'; contc++;
    fila1[contc] = 'Compromisos'; contc++;
    fila1[contc] = 'Cumplido'; contc++;
    fila1[contc] = 'Visibilidad'; contc++;
    body[0] = fila1; contc = 0;
    console.log('Tabla hasta el momento:  ', body);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    for (const act of this.actividades) {
      const fila: any[] = [];
      fila[contc] = act.semana; contc++;
      const fechaI = act.fecha_inicio;
      fila[contc] = fechaI.toLocaleDateString('es-ES', options); contc++;
      const fechaE = act.fecha_entrega;
      fila[contc] = fechaE.toLocaleDateString('es-ES', options); contc++;
      fila[contc] = act.entregas; contc++;
      fila[contc] = act.compromisos; contc++;
      if (act.cumplido === 0) {fila[contc] = 'No Cumplido'; contc++; } else {fila[contc] = 'Cumplido'; contc++; }
      if (act.visibilidad === 0) {
        fila[contc] = 'No Visible para Coordinador'; contc++;
      } else {
        fila[contc] = 'Visible para Coordinador'; contc++;
      }

      body[contf] = fila; contc = 0; contf++;
    }
    /* console.log("BODY:   ",body); */
    return new Table(body).end;
  }
  onSubmit() {
    if (this.formulario.valid) {
      console.log('FORMULARIO VALIDO');
      Swal.fire(
        'Exito!',
        'Seguimiento Almacenado!',
        'success'
      );

    this.banNotificaciones.emit(true);

    } else {
      console.log('FORMULARIO IN VALIDO');
      this.formulario.markAllAsTouched();
      // this.errorFormulario();
    }
    this.crearFormulario();
  }

  crearTutor() {
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.tutor.subscribe(
      result => {
        this.formulario.get('tutor').setValue(result.nombre + ' ' + result.apellido);
      }
    );
  }
  cancelar() {
    this.crearFormulario();
    Swal.fire(
      'Cancelado!',
      'Seguimiento no Almacenado!',
      'error'
    );
    this.banNotificaciones.emit(true);
  }
  editarActividad(elem: ActividadTutor) {
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '900px', height: '600px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad = elem;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
  private crearFormulario(): void {
    console.log("Entro a crear un formulario de edita",this.seguimientoTutor);
    this.formulario = this.formBuilder.group(
      {
        nombre: [{value: this.seguimientoTutor.nombre, disabled:true}, [Validators.required,
        Validators.maxLength(30)]
        ],
        tipo: [{value: this.seguimientoTutor.tipoSeguimiento.nombre, disabled:true},  [Validators.required ]],
        tutor: [{value: this.seguimientoTutor.tutor.nombre+' '+this.seguimientoTutor.tutor.apellido, disabled:true}, [Validators.required ]],
        estudiante: [{value: this.seguimientoTutor.estudiante.nombres+' '+this.seguimientoTutor.estudiante.apellidos, disabled:true}, [Validators.required]],
        cohorte: [{value: this.seguimientoTutor.cohorte, disabled:true}, [Validators.required]],
        estado: [null, [Validators.required] ],
        objetivo: [this.seguimientoTutor.objetivoGeneral, [ Validators.required] ],
        coodirector: [{value: this.seguimientoTutor.codirector, disabled:true}, [Validators.required] ],
        objetivosEspecificos: [this.seguimientoTutor.objetivosEspecificos, [/* Validators.required */]]
      });

     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value => {
          console.log('VALUE:   ', value);
          let p = 0;
          if (value.nombre != '') { p++; }
          if (value.tipo != null) { p++; }
          if (value.tutor != null) { p++; }
          if (value.estudiante != null) { p++; }
          if (value.estado != '') { p++; }
          if (value.cohorte != null) { p++; }
          if (value.objetivo != '') { p++; }
          if (value.coodirector != '') { p++; }
          if (value.estadoSeguimiento != null) { p++; }
          if (value.objetivo != '') { p++; }
          this.porcentaje = (10 * p);
          console.log(value);
        }
      );
  }
  clearArray(arrayClear: Array<string>) {
    return arrayClear = [];
  }
  getAllCohorte() {// se llena un array con los años desde el 2000 hasta la fecha actual para usarlas en el combo cohorte estudiante
    const date = new Date();
    const dateYear = date.getFullYear();
    this.optionsCohorte = this.clearArray(this.optionsCohorte);
    this.optionsCohorte[0] = '' + dateYear;
    for (let i = 1; i <= (dateYear - this.YEAR_END_COHORTE); i++) {
      this.optionsCohorte[i] = '' + (dateYear - i);
    }
  }
  agregarActividad() {
    const dialogRef = this.dialog.open(AgregarActividadComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }

}
