import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../modelos/seguimiento.model';
import { SeguimientosService } from '../../servicios/seguimientos.service';





@Component({
  selector: 'app-list-seguimientos',
  templateUrl: './list-seguimientos.component.html',
  styleUrls: ['./list-seguimientos.component.css']
})
export class ListSeguimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos:Array<Seguimiento>=[];
  constructor( private router: Router, private seguimientoService:SeguimientosService) {
    // Create 100 users
    
    this.seguimientos= this.seguimientoService.onSeguimientos();
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.seguimientos);
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
    this.router.navigate(['/seguimiento/agregar']);
  }
  /** Builds and returns a new User. */
  




}

