import { SeguimientosService } from './../../servicios/seguimientos.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Seguimiento } from '../../modelos/seguimiento.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerActividadEstudianteComponent } from '../../../seguimiento_estudiante/componentes/ver-actividad-estudiante/ver-actividad-estudiante.component';
import { Actividad } from '../../modelos/actividad.model';
import { ActividadesService } from '../../servicios/actividades.service';
import { VerActividadesComponent } from '../ver-actividades/ver-actividades.component';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { SeguimientoCompleto } from '../../modelos/seguimientoCompleto.model';

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.scss']
})

export class ListarActividadesComponent implements OnInit {


  @Input() seguimiento:SeguimientoCompleto;
  displayedColumns: string[] = ['codigo', 'semana', 'fecha_inicio', 'fecha_entrega','cumplido','opciones'];
  dataSource: MatTableDataSource<Actividad>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  actividades: Array<Actividad> = [];
  constructor( private router: Router,
               private actividadesService:ActividadesService,
               private dialog: MatDialog, private seguimientosService:SeguimientosService) {
    // Create 100 users
  }

  ngOnInit(): void {

    this.actividades = this.actividadesService.onActividades(this.seguimiento.id);
    this.actividadesService.getActividades(this.seguimiento.id).subscribe(
      result =>{
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

  verActividad(row) {

    const dialogRef = this.dialog.open(VerActividadesComponent, {
      width: '400px', position:{top: '65px' },
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
    pdf.add(new Txt('Estudiante:  '+this.seguimiento.estudiante.getName()).end );
    pdf.add("\n\n\n");/*
    pdf.watermark('UNIVERSIDAD DEL CAUCA');  */

    pdf.add(this.crearTabla());
    pdf.create().download();
  }

crearTabla()
  {
    let body:any[]=[];
    let contf=1;
    let contc=0;
    let fila1:any[]=[];
    fila1[contc]="Semana";contc++;
    fila1[contc]="Fecha Inicio";contc++;
    fila1[contc]="Fecha Entrega";contc++;
    fila1[contc]="Entregas";contc++;
    fila1[contc]="Compromisos";contc++;
    fila1[contc]="Cumplido";contc++;
    fila1[contc]="Visibilidad";contc++;
    body[0]=fila1;contc=0;


    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    for(let act of this.actividades)
    {
      let fila:any[]=[];
      fila[contc]=act.semana;contc++;
      var fechaI = act.fecha_inicio;
      fila[contc]=fechaI.toLocaleDateString("es-ES", options);contc++;
      var fechaE = act.fecha_entrega;
      fila[contc]=fechaE.toLocaleDateString("es-ES", options);contc++;
      fila[contc]=act.entregas;contc++;
      fila[contc]=act.compromisos;contc++;
      if(act.cumplido==0){fila[contc]="No Cumplido";contc++;}
      else{fila[contc]="Cumplido";contc++;}
      if(act.visibilidad==0){fila[contc]="No Visible para Coordinador";contc++;}
      else{fila[contc]="Visible para Coordinador";contc++;}

      body[contf]=fila;contc=0; contf++;
    }
    /* console.log("BODY:   ",body); */
    return new Table(body).end;
  }

}
