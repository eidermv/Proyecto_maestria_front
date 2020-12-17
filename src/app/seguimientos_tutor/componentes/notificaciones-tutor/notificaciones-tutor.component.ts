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
import { Subscription } from 'rxjs';
// tslint:disable-next-line: class-name


@Component({
  selector: 'app-notificaciones-tutor',
  templateUrl: './notificaciones-tutor.component.html',
  styleUrls: ['./notificaciones-tutor.component.css']
})
export class NotificacionesTutorComponent implements OnInit {
  notificacionesInstance: SeguimientoTutorCompleto[]=[];
  copiaAceptados: SeguimientoTutorCompleto[]=[];
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
    this.refrescarEspera();

  }
  refrescarEspera(){
    this.copiaAceptados=this.notificacionesInstance;
    this.notificacionesInstance=[];
    for(let s of this.copiaAceptados){
      if(s.estadoSeguimiento.nombre === "Espera"){
        this.notificacionesInstance.push(s);
      }
    }
    this.dataSource = new MatTableDataSource(this.notificacionesInstance);
    console.log("objetos de NOTIFICACIONES",this.notificacionesInstance);
    console.log("objetos de NOTIFICACIONES",this.copiaAceptados);
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
    for(let s of this.notificacionesInstance){
      if(s.idSeguimiento === seguimiento.idSeguimiento)
      {
        s.estadoSeguimiento.nombre="Aceptado";
        s.estadoSeguimiento.idEstadoSeguimiento=1;
      }
    }
    this.ngOnInit();
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
    for(let s of this.notificacionesInstance){
      if(s.idSeguimiento === seguimiento.idSeguimiento)
      {
        s.estadoSeguimiento.nombre="Rechazado";
        s.estadoSeguimiento.idEstadoSeguimiento=3;
      }
    }
    this.ngOnInit();
  }
}
