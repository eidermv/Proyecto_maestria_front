import { notificacionesTutor } from './../notificaciones-tutor/notificaciones-tutor.component';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionesTutorComponent } from '../notificaciones-tutor/notificaciones-tutor.component';
// Servicios
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import { SeguimientoTutor } from '../../modelos/seguimientoTutor.model';
@Component({
  selector: 'app-list-tutor-seguimientos',
  templateUrl: './list-tutor-seguimientos.component.html',
  styleUrls: ['./list-tutor-seguimientos.component.css'],
})
export class ListTutorSeguimientosComponent implements OnInit {
  hidden = false;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  segumientos: SeguimientoTutor[] = [];
  dataSource = new MatTableDataSource(this.segumientos);
  bandera = true;
  seguimiento:SeguimientoTutor;

  constructor(private router: Router, private dialog: MatDialog, private seguimientosServiceTutor: SeguimientosTutorServices) {}
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.segumientos = this.seguimientosServiceTutor.obtenerSeguimientosTutor();
    this.dataSource = new MatTableDataSource(this.segumientos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.seguimiento= this.seguimientosServiceTutor.Seguimiento[0];
  }
  editarSeguimientoTutor(element:SeguimientoTutor) {
    this.bandera = !this.bandera;
    this.seguimiento=element;
  }
  notificar(event) {
    this.bandera = event;
    console.log('imprimiendo desde notificaciones: ', this.bandera);
  }
  contarNoticaciones() {
    this.hidden = !this.hidden;
  }
  notificaciones(row: SeguimientoTutor) {
    const dialogRef = this.dialog.open(NotificacionesTutorComponent, {
      width: '800px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.notificacionesInstance = row;
  }
}



