import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionesTutorComponent } from '../notificaciones-tutor/notificaciones-tutor.component';

@Component({
  selector: 'app-list-tutor-seguimientos',
  templateUrl: './list-tutor-seguimientos.component.html',
  styleUrls: ['./list-tutor-seguimientos.component.css'],
})
export class ListTutorSeguimientosComponent implements OnInit {
  hidden = false;
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  bandera = true;
  /*columnas = [
    {titulo: 'Codigo', name: 'Codigo' },
    {titulo: 'Nombre', name: 'Nombre' },
    {titulo: 'Tipo', name: 'Tipo' },
    {titulo: 'Estudiante', name: 'Estudiante' },
    {titulo: 'Estado', name: 'Estado' },
    {titulo: 'Accion', name: 'Accion' },
  ];*/
  constructor(private router: Router, private dialog: MatDialog) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  editarSeguimientoTutor() {
    this.bandera = !this.bandera;
  }
  notificar(event) {
    this.bandera = event;
    console.log('imprimiendo desde notificaciones: ', this.bandera);
  }
  contarNoticaciones(){
    this.hidden = !this.hidden;
  }
  notificaciones(row: PeriodicElement) {
    const dialogRef = this.dialog.open(NotificacionesTutorComponent, {
      width: '800px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.notificaciones = row;
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



