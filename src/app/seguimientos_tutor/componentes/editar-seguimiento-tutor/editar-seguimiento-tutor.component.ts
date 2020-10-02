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
  @Input() seguimiento:Seguimiento;
  formulario: FormGroup;
  porcentaje:number;
  YEAR_END_COHORTE: number;
  options: Tutor[] = [];
  optionsCohorte: Array<string>;
  options2: Student[]=[];
  optionsEstadoSeguimiento:EstadoSeguimiento[]=[];
  optionsEstadoProyecto:EstadoProyecto[]=[];
  optionsTiposSeguimiento:TipoSeguimiento[]=[];
  texto = '';
  objEspec: string[];
  @Output()banNotificaciones = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private seguimientoTutorService: SeguimientosTutorServices, private actividadesTutorService: ActividadesTutorServices,
    private tutorService:TutorService, private estudianteService: EstudianteService) 
    {
      this.tutorService.onTutores();
      this.estudianteService.onEstudiantes();
      this.YEAR_END_COHORTE = 2008;
      this.optionsCohorte = [];
      this.optionsEstadoSeguimiento=this.seguimientoTutorService.estadosSeguimientos();
      this.optionsEstadoProyecto=this.seguimientoTutorService.estadosProyecto();
      this.optionsTiposSeguimiento=this.seguimientoTutorService.tiposSeguimiento();
     }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.actividades = this.actividadesTutorService.obtenerActividades();
    this.dataSource = new MatTableDataSource(this.actividades);
    let oe = '';
    let cont = 1;
    this.objEspec = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.seguimiento=this.seguimientoTutorService.Seguimiento[0];
    this.crearFormulario();
    this.getAllCohorte();
    this.options = this.tutorService.tutores;
    this.options2=this.estudianteService.estudiantes;
    
  }
  volver() {
    //this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);
    console.log('emitido: ');
  }
  onSubmit()
  {
    if (this.formulario.valid) 
    {
      console.log("FORMULARIO VALIDO");    
      Swal.fire(
        'Exito!',
        'Seguimiento Almacenado!',
        'success'
      );
      
    this.banNotificaciones.emit(true);
      
    }
    else {
      console.log("FORMULARIO IN VALIDO");
      this.formulario.markAllAsTouched();
      //this.errorFormulario();
    }
    this.crearFormulario();
  }
 
  crearTutor()
  {
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '600px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.tutor.subscribe(
      result => {
        this.formulario.get('tutor').setValue(result.nombre+" "+result.apellido);
      }
    )
  }
  cancelar()
  {
    this.crearFormulario();
    Swal.fire(
      'Cancelado!',
      'Seguimiento no Almacenado!',
      'error'
    );
    this.banNotificaciones.emit(true);
  }
  editarActividad(elem:ActividadTutor) {
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '900px', height: '600px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad=elem;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
  private crearFormulario():void{
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, [Validators.required,
        Validators.maxLength(30)]
        ],
        tipo: [this.seguimiento.tipo,  [/* Validators.required */]],
        tutor: [this.seguimiento.tutor, [/* Validators.required */]],
        estudiante: [this.seguimiento.estudiante, [/* Validators.required */]],
        cohorte:[this.seguimiento.cohorte, [/* Validators.required */]],
        estado: [this.seguimiento.estado, [/* Validators.required */] ],
        objetivo:[this.seguimiento.oGeneral, [ Validators.required] ],        
        coodirector:[this.seguimiento.coodirector, [/* Validators.required */] ],
        estadoSeguimiento:[this.seguimiento.estadoSeguimiento, [/* Validators.required */]]
      });
     
     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{
          console.log("VALUE:   ",value)
          let p=0;
          if(value.nombre !="") p++;
          if(value.tipo!=null) p++;
          if(value.tutor!=null) p++;
          if(value.estudiante!=null) p++;
          if(value.estado!="") p++;
          if(value.cohorte!=null) p++;
          if(value.objetivo!="") p++;
          if(value.coodirector!="") p++;
          if(value.estadoSeguimiento!=null) p++;          
          if(value.objetivo!="") p++;
          this.porcentaje=(10*p);
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
  agregarActividad(){
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
