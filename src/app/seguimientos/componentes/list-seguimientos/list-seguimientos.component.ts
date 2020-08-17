import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../modelos/seguimiento.model';



/** Constants used to fill up our data base. */
const PROYECTS: string[] = [
  'TESIS1', 'TESIS2', 'TESIS3', 'TESIS4', 'TESIS5'
];
const TYPES: string[] = [
  'TESIS', 'PROPUESTA', 'TESIS', 'TESIS', 'PROPUESTA'
];
const TUTORS: string[] = [
  'CARLOS', 'COBOS', 'SANDRA', 'BUITRÓN', 'FRANCISCO', 'NESTOR', 'ARDILA', 'HENDRIS', 'DANIEL'
];
const STATUS: string[] = [
  'APROBADO', 'INICIADO', 'CANCELADO', 'NO APROBADO'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-list-seguimientos',
  templateUrl: './list-seguimientos.component.html',
  styleUrls: ['./list-seguimientos.component.css']
})
export class ListSeguimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;
  id:number=0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private router: Router) {
    // Create 100 users
    const seguimientos = Array.from({ length: 100 }, (_, k) => this.crearSeguimiento(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(seguimientos);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  agregar(){
    this.router.navigateByUrl('/seguimiento/agregar');
  }
  /** Builds and returns a new User. */
  crearSeguimiento(id: number): Seguimiento {

    const student = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const tut = TUTORS[Math.round(Math.random() * (TUTORS.length - 1))] + ' ' +
      TUTORS[Math.round(Math.random() * (TUTORS.length - 1))].charAt(0) + '.';
    const proy = PROYECTS[Math.round(Math.random() * (PROYECTS.length - 1))];
    const type = TYPES[Math.round(Math.random() * (TYPES.length - 1))];
    const state = STATUS[Math.round(Math.random() * (STATUS.length - 1))];
    this.id+=1;
    const identificador=this.id;
    return {
      id: identificador,
      nombre: proy,
      tipo: type,
      tutor: tut,
      estudiante: student,
      estado: state
    };

  }




}

