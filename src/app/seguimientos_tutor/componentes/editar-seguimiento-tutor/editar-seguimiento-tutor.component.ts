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
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-editar-seguimiento-tutor',
  templateUrl: './editar-seguimiento-tutor.component.html',
  styleUrls: ['./editar-seguimiento-tutor.component.css']
})
export class EditarSeguimientoTutorComponent implements OnInit {
  panelOpenState = false;
  actividades: ActividadTutor[] = [];
  seguimientoTutor: SeguimientoTutorCompleto;
  @Input() seguimiento: SeguimientoTutorCompleto;
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

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private seguimientoTutorService: SeguimientosTutorServices, private actividadesTutorService: ActividadesTutorServices,
    private tutorService: TutorTutorService, private estudianteService: EstudianteService) {
      this.seguimientoTutor=new SeguimientoTutorCompleto();
      this.estudianteService.onEstudiantes();
      this.YEAR_END_COHORTE = 2008;
      this.optionsCohorte = [];
     }


  ngOnInit(): void {
    this.seguimientoTutor = new SeguimientoTutorCompleto();
    this.seguimientoTutor = {...this.seguimientoTutorService.seguimiento};

    this.listarEstadosProyecto();
    this.cargarActividades();
    const oe = '';
    const cont = 1;
    this.objEspec = [];

    this.crearFormulario();
    this.getAllCohorte();
    this.options2 = this.estudianteService.estudiantes;

  }
  //lista los estados del proyecto que se encuentran disponible
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
  //lista las actividades del seguimiento seleccionado
  cargarActividades(){
    this.actividadesTutorService.obtenerActividadesTutor(this.seguimientoTutor.idSeguimiento).subscribe((data) => {
      if (data.estado === 'exito') {
        data.data.forEach( (item) => {
          const actividadesE: ActividadTutor = item;
          this.actividades.push(actividadesE);
        });
      }
    });
  }
  volver() {
    // this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);

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


    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    for (const act of this.actividades) {
      const fila: any[] = [];
      fila[contc] = act.semana; contc++;
      const fechaI = act.fechaInicio;
      fila[contc] = fechaI; contc++;
      const fechaE = act.fechaEntrega;
      fila[contc] = fechaE; contc++;
      fila[contc] = act.entregas; contc++;
      fila[contc] = act.compromisos; contc++;
      if (act.cumplida === 0) {fila[contc] = 'No Cumplido'; contc++; } else {fila[contc] = 'Cumplido'; contc++; }
      if (act.visible === 0) {
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
      let seg={
      nombre : this.seguimientoTutor.nombre,
      id_tutor : this.seguimientoTutor.tutor.id_tutor,
      codirector: this.seguimientoTutor.codirector,
      id_estudiante : this.seguimientoTutor.estudiante.id,
      objetivoGeneral : this.seguimientoTutor.objetivoGeneral,
      cohorte : this.seguimientoTutor.cohorte,
      idSeguimiento : this.seguimientoTutor.idSeguimiento,
      objetivosEspecificos : this.seguimientoTutor.objetivosEspecificos,
      idEstadoProyecto : this.seguimientoTutor.estadoProyecto.idEstadoSeguimiento,
      idTipoSeguimiento: this.seguimientoTutor.tipoSeguimiento.idTipoSeguimiento,
      idEstadoSeguimiento : this.seguimientoTutor.estadoSeguimiento.idEstadoSeguimiento,
      };

      this.seguimientoTutorService.guardarSeguimientoTutor(seg);

      Swal.fire(
        'Exito!',
        'Seguimiento Actualizado!',
        'success'
      );
      this.banNotificaciones.emit(true);
    } else{

      this.formulario.markAllAsTouched();
    }
    this.crearFormulario();
  }
  cancelar() {
    //se vuelve a llamar?
    this.crearFormulario();
    this.ngOnInit();
    Swal.fire(
      'Cancelado!',
      'Seguimiento no Actualizado!',
      'error'
    );
    this.banNotificaciones.emit(true);
  }
  private crearFormulario(): void {

    this.formulario = this.formBuilder.group(
      {
        nombre: [{value: this.seguimientoTutor.nombre, disabled:true},
          [Validators.required, Validators.maxLength(30)]],
        tipo: [{value: this.seguimientoTutor.tipoSeguimiento.nombre, disabled:true},  [Validators.required ]],
        tutor: [{value: this.seguimientoTutor.tutor.nombre+' '+this.seguimientoTutor.tutor.apellido, disabled:true}, [Validators.required ]],
        estudiante: [{value: this.seguimientoTutor.estudiante.nombres+' '+this.seguimientoTutor.estudiante.apellidos, disabled:true}, [Validators.required]],
        cohorte: [{value: this.seguimientoTutor.cohorte, disabled:true}, [Validators.required]],
        estado: [this.seguimientoTutor.estadoProyecto.nombre, [Validators.required] ],
        objetivo: [this.seguimientoTutor.objetivoGeneral, [ Validators.required] ],
        coodirector: [{value: this.seguimientoTutor.codirector, disabled:true}, [Validators.required] ],
        objetivosEspecificos: [this.seguimientoTutor.objetivosEspecificos, [Validators.required]]
      });
      //Explicar este evaluador de cambios
     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value => {

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

        }
      );
      this.formulario.get('estado').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('estado').valid){
            this.seguimientoTutor.estadoProyecto=this.formulario.get('estado').value;
          }
        }
      );
      this.formulario.get('objetivo').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('objetivo').valid){
            this.seguimientoTutor.objetivoGeneral=this.formulario.get('objetivo').value;
          }
        }
      );
      this.formulario.get('objetivosEspecificos').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('objetivosEspecificos').valid){
            this.seguimientoTutor.objetivosEspecificos=this.formulario.get('objetivosEspecificos').value;
          }
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
}
