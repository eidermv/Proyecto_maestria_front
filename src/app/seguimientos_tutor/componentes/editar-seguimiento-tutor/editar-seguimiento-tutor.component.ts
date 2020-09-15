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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  panelOpenState = false;
  formulario: FormGroup;
  seguimiento: Seguimiento;
  texto = '';
  objEspec: string[];
  @Output()banNotificaciones = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    let oe = '';
    let cont = 1;
    this.objEspec = [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, [Validators.required,
        Validators.maxLength(50)]
        ],
        tipo: [this.seguimiento.tipo, []],
        tutor: [this.seguimiento.tutor, []],
        estudiante: [this.seguimiento.estudiante, []],
        estado: [this.seguimiento.estado, []],
        objetivoGeneral:[this.seguimiento.oGeneral,[]],
        objetivosEspec:[this.seguimiento.oEspecificos,[]]
      });
      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
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

export interface PeriodicElement {
  Codigo: number;
  Nombre: string;
  Tipo: string;
  Estudiante: string;
  Estado: string;
  Accion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Codigo: 1, Nombre: 'Requisitos NF', Tipo: 'tesis', Estudiante: 'Santiago Castillo', Estado: 'inicio', Accion: ''},
  {Codigo: 2, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 3, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 4, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 5, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 6, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 7, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
  {Codigo: 8, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: ''},
];
