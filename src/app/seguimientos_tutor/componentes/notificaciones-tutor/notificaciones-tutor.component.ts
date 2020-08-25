import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
// tslint:disable-next-line: class-name
export interface notificacioesTutor {
  Codigo: number;
  Nombre: string;
  Tipo: string;
  Estudiante: string;
  Estado: string;
  Accion: string;
}
const ELEMENT_DATA: notificacioesTutor[] = [
  {Codigo: 1, Nombre: 'Requisitos NF', Tipo: 'tesis', Estudiante: 'Santiago Castillo', Estado: 'inicio', Accion: 'ddd'},
  {Codigo: 2, Nombre: 'Modelo de NF', Tipo: 'tesis', Estudiante: 'Jhonatan Zuñiga', Estado: 'inicio', Accion: 'ddd'},
];

@Component({
  selector: 'app-notificaciones-tutor',
  templateUrl: './notificaciones-tutor.component.html',
  styleUrls: ['./notificaciones-tutor.component.css']
})
export class NotificacionesTutorComponent implements OnInit {
  @Output()banNotificaciones = new EventEmitter<boolean>();
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
  constructor(private router: Router) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  volver() {
    //this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);
    console.log('emitido: ');
  }
}
