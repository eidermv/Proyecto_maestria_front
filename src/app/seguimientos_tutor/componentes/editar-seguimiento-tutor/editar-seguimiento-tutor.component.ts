import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActividadesTutorServices } from './../../servicios/actividadesTutor.service';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { SeguimientosTutorServices } from './../../servicios/seguimientosTutor.service';
import { Seguimiento } from './../../../seguimientos_admin/modelos/seguimiento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditarSeguimientoComponent } from './../../../seguimientos_admin/componentes/editarSeguimiento/editar-seguimiento/editar-seguimiento.component';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarActividadTutorComponent } from '../editar-actividad-tutor/editar-actividad-tutor.component';

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
  formulario: FormGroup;
  seguimiento: Seguimiento;
  texto = '';
  objEspec: string[];
  @Output()banNotificaciones = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog,
    private seguimientoTutorService: SeguimientosTutorServices, private actividadesTutorService: ActividadesTutorServices) { }
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
    console.log("Seguimiento a Cargar",this.seguimiento);
    this.crearFormulario();
    
  }
  volver() {
    //this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);
    console.log('emitido: ');
  }
  editarActividad() {
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '900px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
  crearFormulario()
  {
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, 
        ],
        tipo: [this.seguimiento.tipo, []],
        tutor: [this.seguimiento.tutor, []],
        coodirector : [this.seguimiento.tutor, []],
        estudiante: [this.seguimiento.estudiante, []],
        estado: [this.seguimiento.estado, []],
        objetivoGeneral:[this.seguimiento.oGeneral, []],
        objetivosEspec:[this.seguimiento.oEspecificos, []]
      });
      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
  }
  agregarActividad(){
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '900px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }

}
