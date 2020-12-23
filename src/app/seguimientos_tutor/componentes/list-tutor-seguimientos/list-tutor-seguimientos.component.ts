import { element } from 'protractor';
import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { SeguimientoCompleto } from './../../../seguimientos_admin/modelos/seguimientoCompleto.model';
import {Router} from '@angular/router';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import { VerSeguimientoTutorComponent } from '../ver-seguimiento-tutor/ver-seguimiento-tutor.component';
import {ReplaySubject} from 'rxjs';
import {AuthService} from '../../../modules/auth/auth.service';
import {take, takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-list-tutor-seguimientos',
  templateUrl: './list-tutor-seguimientos.component.html',
  styleUrls: ['./list-tutor-seguimientos.component.css'],
})
export class ListTutorSeguimientosComponent implements OnInit, OnDestroy {
  hidden = false;
  segEspera:SeguimientoTutorCompleto[]=[];
  segAceptado:SeguimientoTutorCompleto[]=[];
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  seguimientos: SeguimientoTutorCompleto[] = [];
  dataSource = new MatTableDataSource<SeguimientoTutorCompleto>(this.seguimientos);
  bandera:boolean;
  seguimiento: SeguimientoTutorCompleto;
  filtrado:boolean;
  seguimientosPDF: SeguimientoTutorCompleto[] = [];
  private subs: ReplaySubject<void> = new ReplaySubject();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private seguimientosServiceTutor: SeguimientosTutorServices,
    private auth: AuthService) {}


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.segEspera=[];
    this.segAceptado=[];
    this.seguimientos=[];
    this.filtrado=false;
    this.bandera=true;
    console.log("ID TUTOR SESIÓN:   ",localStorage.getItem('id'));
    this.auth.infoTutor.next(false);
        this.seguimientosServiceTutor.obtenerSeguimientosTutor(Number(localStorage.getItem('id'))).subscribe((data) => {
          console.log('ESTOS SON LOS SEGUIMIENTO DE TUTOR', JSON.stringify(data));
          if (data.estado === 'exito') {
            data.data.forEach( (item) => {
              const seguimiento: SeguimientoTutorCompleto = item;
              this.seguimientos.push(seguimiento);
              this.seguimientosPDF.push(seguimiento);
            });
            console.log('SEGUIMIENTOS TUTOR OBTENIDOS:   ', this.seguimientos);
            this.seguimientosEspera();
            this.dataSource.data = this.segAceptado;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        });
  }

  seguimientosEspera()
  {
    console.log("Entro a seguimientos espera: ",this.seguimientos)
    for(let s of this.seguimientos)
    {
      if(s.estadoSeguimiento.nombre==='Espera'){ this.segEspera.push(s);}
      if(s.estadoSeguimiento.nombre==='Aceptado'){this.segAceptado.push(s);}
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
      fila[contc]=seg.tipoSeguimiento.nombre;contc++;
      fila[contc]=seg.tutor.nombre;contc++;
      fila[contc]=seg.estudiante;contc++;
      fila[contc]=seg.estadoSeguimiento.nombre;contc++;
      fila[contc]=seg.codirector;contc++;
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
    for(let seg of this.seguimientos)
    {
      let fila:any[]=[];
      fila[contc]=contf;contc++;
      fila[contc]=seg.nombre;contc++;
      fila[contc]=seg.tipoSeguimiento.nombre;contc++;
      fila[contc]=seg.tutor.nombre+' '+seg.tutor.apellido;contc++;
      fila[contc]=seg.estudiante.nombres+' '+seg.estudiante.apellidos;contc++;
      fila[contc]=seg.estadoSeguimiento.nombre;contc++;
      fila[contc]=seg.codirector;contc++;
      body[contf]=fila;contc=0; contf++;
    }
    /* console.log("BODY:   ",body); */
    return new Table(body).end;
  }
  obtenerSeguimientos(){
    this.seguimientosServiceTutor.obtenerSeguimientosTutor(this.seguimiento.idSeguimiento);
  }
  editarSeguimientoTutor(element: SeguimientoTutorCompleto) {
    this.bandera = !this.bandera;
    this.seguimientosServiceTutor.seguimiento = element;
    console.log('imprimiendo desde editar: ', this.seguimientosServiceTutor.seguimiento);
  }
  notificar() {
    this.bandera = !this.bandera;
    console.log('imprimiendo desde notificaciones: ', this.bandera);
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
      this.ngOnInit();
    });
    dialogRef.componentInstance.notificacionesInstance = this.segEspera;
  }

  verSeguimiento(seg: SeguimientoTutorCompleto)
  {
    const dialogRef = this.dialog.open(VerSeguimientoTutorComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.seguimiento = seg;
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}



