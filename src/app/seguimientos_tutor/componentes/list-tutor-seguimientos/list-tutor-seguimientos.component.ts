import { notificacionesTutor } from './../notificaciones-tutor/notificaciones-tutor.component';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionesTutorComponent } from '../notificaciones-tutor/notificaciones-tutor.component';
// Servicios
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import { SeguimientoTutor } from '../../modelos/seguimientoTutor.model';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { VerSeguimientoComponent } from '../../../seguimientos_admin/componentes/verSeguimiento/ver-seguimiento/ver-seguimiento.component';
import { Seguimiento } from '../../../seguimientos_admin/modelos/seguimiento.model';
@Component({
  selector: 'app-list-tutor-seguimientos',
  templateUrl: './list-tutor-seguimientos.component.html',
  styleUrls: ['./list-tutor-seguimientos.component.css'],
})
export class ListTutorSeguimientosComponent implements OnInit {
  hidden = false;
  segEspera:SeguimientoTutor[]=[];
  segAceptado:SeguimientoTutor[]=[];
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  segumientos: SeguimientoTutor[] = [];
  dataSource = new MatTableDataSource(this.segumientos);
  bandera = true;
  seguimiento:SeguimientoTutor;

  constructor(private router: Router, private dialog: MatDialog, private seguimientosServiceTutor: SeguimientosTutorServices) {}
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.segumientos = this.seguimientosServiceTutor.obtenerSeguimientosTutor();
    this.seguimientosEspera();
    this.dataSource = new MatTableDataSource(this.segAceptado);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.seguimiento= this.seguimientosServiceTutor.Seguimiento[0];
  }
  editarSeguimientoTutor(element:SeguimientoTutor) {
    this.bandera = !this.bandera;
    this.seguimiento=element;
  }
  notificar(event) {
    this.bandera = event;
    console.log('imprimiendo desde notificaciones: ', this.bandera);
  }
  seguimientosEspera()
  {
    for(let s of this.segumientos)
    {
      if(s.estadoSeguimiento==='espera'){ this.segEspera.push(s);}
      if(s.estadoSeguimiento==='aceptado'){this.segAceptado.push(s);}     
    }
  }
  contarNoticaciones() {
    this.hidden = !this.hidden;
  }
  notificaciones() {
    const dialogRef = this.dialog.open(NotificacionesTutorComponent, {
      width: '800px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.notificaciones = this.segEspera;
  }
  async crearPDF()
  {
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
  });
  pdf.info({
    title: 'Listado Proyectos Maestría',
    author: 'Universidad del Cauca',
    subject: 'Reporte',
});
var fecha = new Date();
var options = { year: 'numeric', month: 'long', day: 'numeric' };
    pdf.pageMargins([ 100, 60, 40, 40 ]);
     pdf.header("\n\n.     \t\t"+fecha.toLocaleDateString("es-ES", options));  
    pdf.add(new Txt('Listado de proyectos').alignment('center').bold().end );
    pdf.add(new Txt('Maestría en Automática').alignment('center').bold().end );  
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
    fila1[contc]="Nombre";contc++;
    fila1[contc]="Tipo";contc++;
    fila1[contc]="Tutor";contc++;
    fila1[contc]="Estudiante";contc++;
    fila1[contc]="Estado";contc++;
    fila1[contc]="Coodirector";contc++; 
    body[0]=fila1;contc=0;
    for(let seg of this.segumientos)
    {
      let fila:any[]=[]; 
      fila[contc]=seg.nombre;contc++;
      fila[contc]=seg.tipo;contc++;
      fila[contc]=seg.tutor;contc++;
      fila[contc]=seg.estudiante;contc++;
      fila[contc]=seg.estado;contc++;
      fila[contc]=seg.coodirector;contc++;      
      body[contf]=fila;contc=0; contf++;
    } 
    /* console.log("BODY:   ",body); */
    return new Table(body).end;
  }
  verSeguimiento(row:SeguimientoTutor)
  {
    const dialogRef = this.dialog.open(VerSeguimientoComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    let seg:Seguimiento=
    {
      nombre:row.nombre,
      tipo:row.tipo,
      tutor:row.tutor,
      estudiante:row.estudiante,
      estado:row.estado,
      cohorte: row.cohorte,
      coodirector:row.coodirector,
      estadoSeguimiento:row.estadoSeguimiento,
      oGeneral:row.oGeneral,
      oEspecificos:row.oEspecificos,
      id:row.id
    };
    dialogRef.componentInstance.seguimiento = seg;
  }
}



