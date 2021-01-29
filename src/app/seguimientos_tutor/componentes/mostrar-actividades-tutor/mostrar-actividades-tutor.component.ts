import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { SeguimientoTutorCompleto } from '../../modelos/seguimientoTutorCompleto.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import { AgregarActividadComponent } from '../agregar-actividad/agregar-actividad.component';
import { EditarActividadTutorComponent } from '../editar-actividad-tutor/editar-actividad-tutor.component';

@Component({
  selector: 'app-mostrar-actividades-tutor',
  templateUrl: './mostrar-actividades-tutor.component.html',
  styleUrls: ['./mostrar-actividades-tutor.component.css']
})
export class MostrarActividadesTutorComponent implements OnInit {
  seguimientoTutor: SeguimientoTutorCompleto;
  actividades: ActividadTutor[]=[];
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  dataSource: MatTableDataSource<ActividadTutor>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private datePipe :DatePipe, private dialog: MatDialog , private actividadesTutorService: ActividadesTutorServices,
    private seguimientoTutorService: SeguimientosTutorServices) { }

  ngOnInit(): void {
    this.actividades = [];
    this.seguimientoTutor = new SeguimientoTutorCompleto();
    this.seguimientoTutor = this.seguimientoTutorService.seguimiento;
    this.cargarActividades();
  }
  cargarActividades(){
    this.actividadesTutorService.obtenerActividadesTutor(this.seguimientoTutor.idSeguimiento).subscribe((data) => {
      if (data.estado === 'exito') {
        data.data.forEach( (item) => {
          const actividadesE: ActividadTutor = item;
          this.actividades.push(actividadesE);
        });
        this.dataSource = new MatTableDataSource(this.actividades);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log("ACTIVIDADES OBTENIAS DEL SERVICIO: ",this.actividades);
    });
  }
  agregarActividad() {
    const dialogRef = this.dialog.open(AgregarActividadComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  editarActividad(elem: ActividadTutor) {
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad = elem;
    dialogRef.componentInstance.seguimiento=this.seguimientoTutor;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
