import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Seguimiento} from '../../../seguimientos_admin/modelos/seguimiento.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {SeguimientosService} from '../../../seguimientos_admin/servicios/seguimientos.service';
import {MatDialog} from '@angular/material/dialog';
import {VerSeguimientoEstudianteComponent} from '../ver-seguimiento-estudiante/ver-seguimiento-estudiante.component';
import {VerActividadEstudianteComponent} from '../ver-actividad-estudiante/ver-actividad-estudiante.component';

@Component({
  selector: 'app-listar-actividades-estudiante',
  templateUrl: './listar-actividades-estudiante.component.html',
  styleUrls: ['./listar-actividades-estudiante.component.css']
})
export class ListarActividadesEstudianteComponent implements OnInit {

  @Input() seguimiento:Seguimiento;


  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos: Array<Seguimiento> = [];
  constructor( private router: Router,
               private seguimientoService: SeguimientosService,
               private dialog: MatDialog) {
    // Create 100 users

    this.seguimientos = this.seguimientoService.onSeguimientos();

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
  /** Builds and returns a new User. */

  verActividad() {
    const dialogRef = this.dialog.open(VerActividadEstudianteComponent, {
      width: '400px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
}
