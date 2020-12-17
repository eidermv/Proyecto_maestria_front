import { TipoSeguimiento } from './../../../seguimientos_admin/modelos/tipoSeguimiento.model';
import { Student } from './../../../models/student';
import { EstadoSeguimiento } from './../../../seguimientos_tutor/modelos/estadoSeguimiento.model';
import { EstadoProyecto } from './../../../seguimientos_admin/modelos/estadosProyecto.model';
import { SeguimientoCompleto } from './../../../seguimientos_admin/modelos/seguimientoCompleto.model';
import { SeguimientosEstudianteService } from './../../services/seguimientos-estudiante.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Seguimiento} from '../../../seguimientos_admin/modelos/seguimiento.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import {SeguimientosService} from '../../../seguimientos_admin/servicios/seguimientos.service';
import {VerSeguimientoEstudianteComponent} from '../ver-seguimiento-estudiante/ver-seguimiento-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; 
import {ReplaySubject} from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import {take, takeUntil} from 'rxjs/operators';
import { TutorCompleto } from '../../../seguimientos_admin/modelos/tutorCompleto.model';
import { TipoTutor } from '../../../seguimientos_admin/modelos/tipoTutor.model';
PdfMakeWrapper.setFonts(pdfFonts);
@Component({
  selector: 'app-listar-seguimiento-estudiante',
  templateUrl: './listar-seguimiento-estudiante.component.html',
  styleUrls: ['./listar-seguimiento-estudiante.component.css']
})
export class ListarSeguimientoEstudianteComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<SeguimientoCompleto>;
  bandListar: boolean;
  filtrado:boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos: Array<SeguimientoCompleto> = [];
  id:number;
  constructor( private router: Router,
               private seguimientoEstudianteService:SeguimientosEstudianteService, private route:ActivatedRoute,
  private dialog: MatDialog,  private auth: AuthService) {
    // Create 100 users
  }

  ngOnInit(): void {
        
        this.id=parseInt(this.route.snapshot.params.id);
        this.seguimientoEstudianteService.obtenerSeguimientosEstudiante(this.id).subscribe(
          result=>{
            result.data.forEach(element => {
              let estadoProyecto:EstadoProyecto={
                id:element.estadoProyecto.idEstadoSeguimiento,
                nombre:element.estadoProyecto.nombre
              };
              let estadoSeguimiento:EstadoSeguimiento={
                id:element.estadoProyecto.idEstadoSeguimiento,
                nombre:element.estadoProyecto.nombre
              };
              let tipoTutor:TipoTutor={
                id:element.tutor.tipoTutor.idTipoTutor,
                nombre:element.tutor.tipoTutor.nombre
              };
              let tutor:TutorCompleto={
                apellido:element.tutor.apellido,
                correo:element.tutor.correo,
                departamento:element.tutor.departamento,
                grupoInvestigacion:element.tutor.grupoInvestigacion,              
                nombre:element.tutor.nombre,
                telefono:element.tutor.telefono,
                tipo:tipoTutor,
                universidad:element.tutor.universidad,
                identificacion:element.tutor.identificacion
              }
              let estudiante:Student=new Student();            
                estudiante.setCodigo(element.estudiante.codigo);
                estudiante.setCohorte(element.estudiante.cohorte);
                estudiante.setEmail(element.estudiante.correo);
                estudiante.setEnteredBy("");
                estudiante.setId(element.estudiante.id),
                estudiante.setName(element.estudiante.nombres);
                estudiante.setEnteredSemester(element.estudiante.semestre);
                estudiante.setState(element.estudiante.estado);
                estudiante.setSurname(element.estudiante.apellidos);
                estudiante.setTutor(tutor.nombre+" "+tutor.apellido);
              let tipoSeguimiento:TipoSeguimiento={
                id:element.tipoSeguimiento.idTipoSeguimiento,
                nombre:element.tipoSeguimiento.nombre
              };
              
              let seg:SeguimientoCompleto={
                cohorte:element.cohorte,
                coodirector:element.codirector,
                estado: estadoProyecto,
                estadoSeguimiento: estadoSeguimiento,
                estudiante:estudiante,
                id:element.idSeguimiento,
                nombre:element.nombre,
                oEspecificos:element.objetivosEspecificos,
                oGeneral:element.objetivoGeneral,
                tipo:tipoSeguimiento,
                tutor:tutor
              }
              this.seguimientos.push(seg);
            });
            this.dataSource = new MatTableDataSource(this.seguimientos);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
          }
          
        );        
        // Assign the data to the data source for the table to render
       
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
 
  /** Builds and returns a new User. */
  verSeguimiento(row:SeguimientoCompleto) {
  
    const dialogRef = this.dialog.open(VerSeguimientoEstudianteComponent, {
      width: '850px',position: { top: '65px', left: '270px'},
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   
    dialogRef.componentInstance .seguimiento=row;
    
    
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
    
    pdf.add(this.crearTablaNoFiltrado());
    pdf.create().download();
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
