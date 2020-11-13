import { TutorCompleto } from './../../modelos/tutorCompleto.model';
import { TipoTutor } from './../../modelos/tipoTutor.model';
import { Tutor } from './../../modelos/tutor.model';
import { Student } from './../../../models/student';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../modelos/seguimiento.model';
import { SeguimientosService } from '../../servicios/seguimientos.service';
import { MatDialog } from '@angular/material/dialog';
import { VerSeguimientoComponent } from '../verSeguimiento/ver-seguimiento/ver-seguimiento.component';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import { EditarSeguimientoComponent } from '../editarSeguimiento/editar-seguimiento/editar-seguimiento.component';
import { SeguimientoCompleto } from '../../modelos/seguimientoCompleto.model';
PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-list-seguimientos',
  templateUrl: './list-seguimientos.component.html',
  styleUrls: ['./list-seguimientos.component.css']
})
export class ListSeguimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<SeguimientoCompleto>;
  bandListar: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos: Array<SeguimientoCompleto> = [];
  seguimientosPDF: Array<SeguimientoCompleto> = [];
  filtrado:boolean;
  constructor( private router: Router, private seguimientoService: SeguimientosService,private dialog: MatDialog) {
    // Create 100 users
this.seguimientos=[];
    
  }

  ngOnInit(): void {
    this.filtrado=false;
    this.bandListar=true;
    this.seguimientos=[];   
    this.seguimientoService.getSeguimientos().subscribe(
      result=>
      {
        console.log("#############SEGUIMIENTOS ENTRANTES:   ",result.data);
        this.seguimientos=[];
        result.data.forEach(element => {
          let est= new Student();
          est.setId(element.estudiante.id);
          est.setName(element.estudiante.nombres);
          est.setSurname(element.estudiante.apellidos);
          est.setCohorte(element.estudiante.cohorte);
         
         
          let tipoTutor:TipoTutor={
            id:element.tutor.tipoTutor.idTipoTutor,
            nombre:element.tutor.tipoTutor.nombre
          };

          let tutor:TutorCompleto={
            identificacion:element.tutor.id_tutor,
            apellido:element.tutor.apellido,
            correo:element.tutor.correo,
            departamento:element.tutor.departamento,
            grupoInvestigacion:element.tutor.grupoInvestigacion,
            nombre:element.tutor.nombre,
            telefono:element.tutor.telefono,
            tipo:tipoTutor,
            universidad:element.tutor.universidad
          };
          let seg: SeguimientoCompleto={
            cohorte:element.estudiante.cohorte,
            coodirector:element.codirector,
            estado:element.estadoProyecto,
            estadoSeguimiento:element.estadoSeguimiento,
            estudiante:est,
            id:element.idSeguimiento,
            nombre:element.nombre,
            oGeneral:element.objetivoGeneral,
            oEspecificos:element.objetivosEspecificos,
            tipo:element.tipoSeguimiento,
            tutor:tutor
          };
          console.log("ESTUDIANTE FORMADO.  ",seg);
          this.seguimientos.push(seg);
        });
        this.dataSource = new MatTableDataSource(this.seguimientos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  
  editarSeguimiento(row:SeguimientoCompleto)
  {
    const dialogRef = this.dialog.open(EditarSeguimientoComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    
    dialogRef.componentInstance.seguimiento=row;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if(filterValue!=''){
      this.filtrado=true;
      this.llenarPDF(this.dataSource.filteredData);
    }
      
    else
    {
      this.filtrado=false;
      this.llenarPDF(this.seguimientos);
    }
  }
  llenarPDF(filteredData: SeguimientoCompleto[]) {
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
    for(let seg of this.seguimientos)
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
  agregar() {
    //this.router.navigate(['/seguimiento/agregar']);
    this.bandListar=false;
  }
  /** Builds and returns a new User. */
  verSeguimiento(row:SeguimientoCompleto)
  {
    const dialogRef = this.dialog.open(VerSeguimientoComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.seguimiento = row;
  }
  cambiar(event)
  {
    this.bandListar=event;
  }



}

