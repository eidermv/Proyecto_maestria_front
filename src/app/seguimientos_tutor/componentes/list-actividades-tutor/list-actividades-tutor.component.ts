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
import { DatePipe } from '@angular/common';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

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
  constructor(private router: Router,private datePipe: DatePipe,
              private actividadesService:ActividadesTutorServices,
              private dialog: MatDialog, private seguimientosTutorService:SeguimientosTutorServices) { }

  ngOnInit(): void {
      this.actividadesService.obtenerActividadesTutor(this.seguimiento.idSeguimiento).subscribe(
      result =>{
        this.actividades=[];

          if (result.estado === 'exito') {
              result.data.forEach( (item) => {
              const actividad: ActividadTutor = item;
              actividad.fechaInicio=this.datePipe.transform(actividad.fechaInicio, "dd/MM/yyyy")
              actividad.fechaEntrega=this.datePipe.transform(actividad.fechaEntrega, "dd/MM/yyyy")
              this.actividades.push(actividad);

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

    });
  }
  eliminarActividad(element: ActividadTutor){
    this.actividadesService.eliminarActividadTutor(element.idActividad).subscribe(
      (result) => {

    });
  }
  async crearPDF()
  {

    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
  });
  pdf.info({
    title: 'Listado De Actividades',
    author: 'Universidad del Cauca',
    subject: 'Reporte',
});
var fecha = new Date();
var options = { year: 'numeric', month: 'long', day: 'numeric' };
    pdf.pageMargins([ 100, 60, 40, 40 ]);
    pdf.header("\n\n.     \t\t"+fecha.toLocaleDateString("es-ES", options));
    pdf.add(new Txt('Listado de Actividades').alignment('center').bold().end );
    pdf.add(new Txt('Seguimiento:  '+this.seguimiento.nombre).end );
    pdf.add(new Txt('Tutor:  '+this.seguimiento.tutor.nombre+" "+this.seguimiento.tutor.apellido).end );
    let estudiante=this.seguimiento.estudiante.nombres +' '+this.seguimiento.estudiante.apellidos;
    pdf.add(new Txt('Estudiante:  '+estudiante ).end);
    pdf.add("\n\n\n");/*
    pdf.watermark('UNIVERSIDAD DEL CAUCA');  */

    pdf.add(this.crearTabla());
    pdf.create().download();
  }
  crearTabla() {
    const body: any[] = [];
    let contf = 1;
    let contc = 0;
    const fila1: any[] = [];
    fila1[contc] = 'Semana'; contc++;
    fila1[contc] = 'Fecha Inicio'; contc++;
    fila1[contc] = 'Fecha Entrega'; contc++;
    fila1[contc] = 'Entregas'; contc++;
    fila1[contc] = 'Compromisos'; contc++;
    fila1[contc] = 'Cumplido'; contc++;
    fila1[contc] = 'Visibilidad'; contc++;
    body[0] = fila1; contc = 0;


    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    for (const act of this.actividades) {
      const fila: any[] = [];
      fila[contc] = act.semana; contc++;
      const fechaI = act.fechaInicio;
      fila[contc] = fechaI; contc++;
      const fechaE = act.fechaEntrega;
      fila[contc] = fechaE; contc++;
      fila[contc] = act.entregas; contc++;
      fila[contc] = act.compromisos; contc++;
      if (act.cumplida === 0)
      {fila[contc] = 'No Cumplido'; contc++; }
      else {fila[contc] = 'Cumplido'; contc++; }
      if (act.visible === 0) {
        fila[contc] = 'No Visible para Coordinador'; contc++;
      } else {
        fila[contc] = 'Visible para Coordinador'; contc++;
      }

      body[contf] = fila; contc = 0; contf++;
    }
    /* console.log("BODY:   ",body); */
    return new Table(body).end;
  }

}
