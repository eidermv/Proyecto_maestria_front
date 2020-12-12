import { Seguimiento } from './../../../seguimientos_admin/modelos/seguimiento.model';
import { SeguimientoTutor } from './../../modelos/seguimientoTutor.model';
import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import { SeguimientoTutorCompleto } from '../../modelos/seguimientoTutorCompleto.model';
// tslint:disable-next-line: class-name
export interface notificacionesTutor {
  Codigo: number;
  Nombre: string;
  Tipo: string;
  Estudiante: string;
  Estado: string;
  Accion: string;
}
const ELEMENT_DATA: notificacionesTutor[] = [
  {Codigo: 1, Nombre: 'Requisitos NF', Tipo: 'tesis', Estudiante: 'Santiago Castillo', Estado: 'inicio', Accion: 'ddd'},
  {Codigo: 2, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: 'ddd'},
];

@Component({
  selector: 'app-notificaciones-tutor',
  templateUrl: './notificaciones-tutor.component.html',
  styleUrls: ['./notificaciones-tutor.component.css']
})
export class NotificacionesTutorComponent implements OnInit {
  notificacionesInstance: SeguimientoTutorCompleto[]=[];
  notificaciones: SeguimientoTutorCompleto[]=[];
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  dataSource = new MatTableDataSource(this.notificacionesInstance);

  constructor(private router: Router, public dialogoReg: MatDialogRef<NotificacionesTutorComponent>, private segumientoTutorService: SeguimientosTutorServices) {}
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.notificacionesInstance);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  guardarAceptar(seguimiento: SeguimientoTutorCompleto) {
    let seguimientoGuardar={
      nombre : seguimiento.nombre,
      id_tutor : seguimiento.tutor.id_tutor,
      codirector: seguimiento.codirector,
      id_estudiante : seguimiento.estudiante.id,
      objetivoGeneral : seguimiento.objetivoGeneral,
      cohorte : seguimiento.cohorte,
      idSeguimiento : seguimiento.idSeguimiento,
      objetivosEspecificos : seguimiento.objetivosEspecificos,
      idEstadoProyecto : seguimiento.estadoProyecto.idEstadoSeguimiento,
      idTipoSeguimiento: seguimiento.tipoSeguimiento.idTipoSeguimiento,
      idEstadoSeguimiento : 1,
    }
    this.segumientoTutorService.guardarSeguimientoTutor(seguimientoGuardar);

  }
  guardarRechazar(seguimiento: SeguimientoTutorCompleto) {
    let seguimientoGuardar={
      nombre : seguimiento.nombre,
      id_tutor : seguimiento.tutor.id_tutor,
      codirector: seguimiento.codirector,
      id_estudiante : seguimiento.estudiante.id,
      objetivoGeneral : seguimiento.objetivoGeneral,
      cohorte : seguimiento.cohorte,
      idSeguimiento : seguimiento.idSeguimiento,
      objetivosEspecificos : seguimiento.objetivosEspecificos,
      idEstadoProyecto : seguimiento.estadoProyecto.idEstadoSeguimiento,
      idTipoSeguimiento: seguimiento.tipoSeguimiento.idTipoSeguimiento,
      idEstadoSeguimiento : 3,
    }
    this.segumientoTutorService.guardarSeguimientoTutor(seguimientoGuardar);
  }
}
