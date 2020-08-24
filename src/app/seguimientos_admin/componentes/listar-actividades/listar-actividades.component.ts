import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Seguimiento } from '../../modelos/seguimiento.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SeguimientosService } from '../../servicios/seguimientos.service';
import { MatDialog } from '@angular/material/dialog';
import { VerActividadEstudianteComponent } from '../../../seguimiento_estudiante/componentes/ver-actividad-estudiante/ver-actividad-estudiante.component';
import { Actividad } from '../../modelos/actividad.model';
import { ActividadesService } from '../../servicios/actividades.service';
import { VerActividadesComponent } from '../ver-actividades/ver-actividades.component';

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.scss']
})

export class ListarActividadesComponent implements OnInit {

  
  @Input() IdSeguimiento;

  
  displayedColumns: string[] = ['codigo', 'semana', 'fecha_inicio', 'fecha_entrega','cumplido','opciones'];
  dataSource: MatTableDataSource<Actividad>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  actividades: Array<Actividad> = [];
  constructor( private router: Router,
               private actividadesService:ActividadesService,
               private dialog: MatDialog) {
    // Create 100 users

    this.actividades = this.actividadesService.onActividades();

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.actividades);
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
  /** Builds and returns a new User. */

  verActividad(row) {
    console.log("ROW ENTRANTE:  ",row);
    const dialogRef = this.dialog.open(VerActividadesComponent, {
      width: '400px',
      data: {
      }
    });
    let a:Actividad;
    a={
      id:row.id,
      semana:row.semana,
      fecha_inicio:row.fecha_inicio,
      fecha_entrega:row.fecha_entrega,
      entregas:row.entregas,
      compromisos:row.compromisos,
      cumplido:row.cumplido,
      visibilidad:row.visibilidad
    };
    dialogRef.componentInstance.actividad=a;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }

}
