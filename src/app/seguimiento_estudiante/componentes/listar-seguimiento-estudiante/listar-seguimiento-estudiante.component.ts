import { SeguimientosEstudianteService } from './../../services/seguimientos-estudiante.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Seguimiento} from '../../../seguimientos_admin/modelos/seguimiento.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {SeguimientosService} from '../../../seguimientos_admin/servicios/seguimientos.service';
import {VerSeguimientoEstudianteComponent} from '../ver-seguimiento-estudiante/ver-seguimiento-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import {ReplaySubject} from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import {take, takeUntil} from 'rxjs/operators';
PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-listar-seguimiento-estudiante',
  templateUrl: './listar-seguimiento-estudiante.component.html',
  styleUrls: ['./listar-seguimiento-estudiante.component.css']
})
export class ListarSeguimientoEstudianteComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;
  bandListar: boolean;
  filtrado:boolean;
  private subs: ReplaySubject<void> = new ReplaySubject();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos: Array<Seguimiento> = [];
  seguimientosPDF: Array<Seguimiento> = [];
  
  constructor( private router: Router,
               private seguimientoEstudianteService:SeguimientosEstudianteService,
  private dialog: MatDialog,  private auth: AuthService) {
    // Create 100 users
  }

  ngOnInit(): void {
    
    
    this.auth.infoEstudiante.pipe(takeUntil(this.subs)).subscribe((valor) => {
      if (valor) {
        let idEst=Number(sessionStorage.getItem('id'));
        console.log("ID Estudiante:   ",Number(sessionStorage.getItem('id')));
        this.seguimientoEstudianteService.obtenerSeguimientosEstudiante(idEst).subscribe(
          result=>{
    console.log("SEGUIMIENTOS DE ESTUDIANTE :   ",result.data);
          }
        );
        this.seguimientoEstudianteService.obtenerActividadesEstudiante(idEst).subscribe(
          result=>{
            console.log("ACTIVIDADES DE ESTUDIANTE :   ",2);
          }
        );
    
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.seguimientos);
        this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
       /*  this.seguimientoEstudianteService.obtenerSeguimientosEstudiante(Number(sessionStorage.getItem('id'))).pipe(take(1)).subscribe((data) => {
          console.log('ESTOS SON LOS SEGUIMIENTO DE TUTOR', JSON.stringify(data));
          if (data.estado === 'exito') {
            data.data.forEach( (item) => {
              const seguimiento: SeguimientoTutorCompleto = item;
              this.segumientos.push(seguimiento);
            });
            console.log('SEGUIMIENTOS TUTOR OBTENIDOS:   ', this.segumientos);
            this.seguimientosEspera();
            this.dataSource.data = this.segAceptado;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        });  */
      }
    });
  }
 
  /** Builds and returns a new User. */
  verSeguimiento(row) {
  
    const dialogRef = this.dialog.open(VerSeguimientoEstudianteComponent, {
      width: '850px',position: { top: '65px', left: '270px'},
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   
    dialogRef.componentInstance .seguimiento=row;
    
    
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
      this.llenarPDF(this.seguimientos);
    }
     

    console.log("Paginator DATA:  ",this.dataSource.filteredData);
  }
  llenarPDF(filteredData: Seguimiento[]) {
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
}
