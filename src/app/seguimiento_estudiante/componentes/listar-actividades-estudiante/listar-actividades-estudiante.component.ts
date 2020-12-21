import { SeguimientosEstudianteService } from './../../services/seguimientos-estudiante.service';
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
import { SeguimientoCompleto } from '../../../seguimientos_admin/modelos/seguimientoCompleto.model';
import { Actividad } from '../../../seguimientos_admin/modelos/actividad.model';

@Component({
  selector: 'app-listar-actividades-estudiante',
  templateUrl: './listar-actividades-estudiante.component.html',
  styleUrls: ['./listar-actividades-estudiante.component.css']
})
export class ListarActividadesEstudianteComponent implements OnInit {

  @Input() seguimiento:SeguimientoCompleto;
  displayedColumns: string[] = ['codigo', 'semana', 'fecha_inicio', 'fecha_entrega','cumplido','opciones'];
  dataSource: MatTableDataSource<Actividad>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  actividades: Array<Actividad> = [];
  constructor( private router: Router,
               private actividadesService: SeguimientosEstudianteService,
               private dialog: MatDialog) {
    // Create 100 users  
  }

  ngOnInit(): void {
    this.actividadesService.obtenerActividadesEstudiante(this.seguimiento.id).subscribe(
      result =>{
        console.log("Actividade del seguimiento:  ",result.data);
        this.actividades=[];
        if(result.data.length>0)
        result.data.forEach(element => {
          let a:Actividad={
            compromisos:element.compromisos,
            cumplido:element.cumplida,
            entregas:element.entregas,
            fecha_inicio:new Date(element.fechaInicio),
            fecha_entrega: new Date(element.fechaEntrega),
            id:element.idActividad,
            semana:element.semana,
            visibilidad:element.visible
          };
          this.actividades.push(a);
        });
         // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.actividades);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.actividades);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      });
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /** Builds and returns a new User. */

  verActividad(row:Actividad) {
    const dialogRef = this.dialog.open(VerActividadEstudianteComponent, {
      width: '400px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad=row;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');

    });
  }
}
