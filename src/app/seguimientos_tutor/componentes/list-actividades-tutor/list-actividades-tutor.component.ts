import { element } from 'protractor';
import { SeguimientosTutorServices } from './../../servicios/seguimientosTutor.service';
import { ActividadesTutorServices } from './../../servicios/actividadesTutor.service';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerActividadTutorComponent } from '../ver-actividad-tutor/ver-actividad-tutor.component';

@Component({
  selector: 'app-list-actividades-tutor',
  templateUrl: './list-actividades-tutor.component.html',
  styleUrls: ['./list-actividades-tutor.component.css']
})
export class ListActividadesTutorComponent implements OnInit {
  @Input() seguimiento:SeguimientoTutorCompleto;
  displayedColumns: string[] = ['codigo', 'semana', 'fecha_inicio', 'fecha_entrega','cumplido','opciones'];
  dataSource: MatTableDataSource<ActividadTutor>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  actividades: ActividadTutor[]=[];
  constructor(private router: Router,
              private actividadesService:ActividadesTutorServices,
              private dialog: MatDialog, private seguimientosTutorService:SeguimientosTutorServices) { }

  ngOnInit(): void {
      this.actividadesService.obtenerActividadesTutor(this.seguimiento.idSeguimiento).subscribe(
      result =>{
        this.actividades=[];
        console.log("ACTIVIDADES QUE LLEGARON:*****  ",JSON.stringify(result.data));
          if (result.estado === 'exito') {
              result.data.forEach( (item) => {
              const actividad: ActividadTutor = item;
              this.actividades.push(actividad);
              console.log("Actividad agregada: ",this.actividades);
            });
            this.dataSource = new MatTableDataSource(this.actividades);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
      }
    );
  }
  verActividad(element: ActividadTutor){
    const dialogRef = this.dialog.open(VerActividadTutorComponent, {
      width: '800px', height: '500px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad = element;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
