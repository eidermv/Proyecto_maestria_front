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
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  segumientos: SeguimientoTutor[] = [];
  dataSource = new MatTableDataSource(this.segumientos);
  bandera = true;
  seguimiento: SeguimientoTutor;
  filtrado:boolean;
  seguimientosPDF: Array<Seguimiento> = [];

  constructor(private router: Router, private dialog: MatDialog, private seguimientosServiceTutor: SeguimientosTutorServices) {}
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit(): void {
    this.obtenerSeguimientos();
    this.dataSource = new MatTableDataSource(this.segumientos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.seguimiento= this.seguimientosServiceTutor.Seguimiento[0];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if(filterValue!=''){
      this.filtrado=true;
      console.log("DATOS FILTRADOS");
      this.llenarPDF(this.dataSource.filteredData);
    }
      
    else
    {
      this.filtrado=false;
      console.log("DATOS NO FILTRADOS");
      this.llenarPDF(this.segumientos);
    }
     

    console.log("Paginator DATA:  ",this.dataSource.filteredData);
  }
  llenarPDF(filteredData: SeguimientoTutor[]) {
   this.seguimientosPDF=[];
   for(let seg of filteredData)
   {
     this.seguimientosPDF.push(seg);
   }   
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
    if(this.filtrado) pdf.add(this.crearTablaFiltrado());
    else pdf.add(this.crearTablaNoFiltrado());
    pdf.create().download();
  }
  crearTablaFiltrado()
  {
    let body:any[]=[];    
    let contf=1;
    let contc=0;  
    let fila1:any[]=[]; 
    fila1[contc]="#";contc++;
    fila1[contc]="Nombre";contc++;
    fila1[contc]="Tipo";contc++;
    fila1[contc]="Tutor";contc++;
    fila1[contc]="Estudiante";contc++;
    fila1[contc]="Estado";contc++;
    fila1[contc]="Coodirector";contc++; 
    body[0]=fila1;contc=0;
    for(let seg of this.seguimientosPDF)
    {
      let fila:any[]=[]; 
      fila[contc]=contf;contc++;
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
  crearTablaNoFiltrado()
  {
    let body:any[]=[];    
    let contf=1;
    let contc=0;  
    let fila1:any[]=[]; 
    fila1[contc]="#";contc++;
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
      fila[contc]=contf;contc++;
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
  obtenerSeguimientos(){
    this.seguimientosServiceTutor.obtenerSeguimientosTutor(1).subscribe(resultado => {
      console.log("seguimientos obtenidos" + JSON.stringify(resultado.data));
    },
    error => {
      console.log('Este es el erro de la peticion'+JSON.stringify(error));
    });
  }
  editarSeguimientoTutor(element: SeguimientoTutor) {
    this.bandera = !this.bandera;
    this.seguimiento = element;
  }
  notificar(event) {
    this.bandera = event;
    console.log('imprimiendo desde notificaciones: ', this.bandera);
  }
  contarNoticaciones() {
    this.hidden = !this.hidden;
  }
  notificaciones(row: SeguimientoTutor) {
    const dialogRef = this.dialog.open(NotificacionesTutorComponent, {
      width: '800px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.notificacionesInstance = row;
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



