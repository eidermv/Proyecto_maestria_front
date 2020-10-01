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
PdfMakeWrapper.setFonts(pdfFonts);


@Component({
  selector: 'app-list-seguimientos',
  templateUrl: './list-seguimientos.component.html',
  styleUrls: ['./list-seguimientos.component.css']
})
export class ListSeguimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;
  bandListar: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  seguimientos: Array<Seguimiento> = [];
  
  constructor( private router: Router, private seguimientoService: SeguimientosService,private dialog: MatDialog) {
    // Create 100 users

    this.seguimientos = this.seguimientoService.onSeguimientos();

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.seguimientos);
  }

  ngOnInit(): void {
    this.bandListar=true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  async crearPDF()
  {
    const pdf = new PdfMakeWrapper();
    pdf.defaultStyle({
      bold: false,
      fontSize: 10
  });
  pdf.pageMargins([ 40, 60 ]);
    console.log("CREANDO PDF");
    pdf.header(".  LISTA DE SEGUIMIENTOS - ADMIN\n"); 
    pdf.add(new Txt('Listado Total de Seguimientos!').alignment('center').italics().end );  
    pdf.add("\n\n\n");
    pdf.watermark('UNIVERSIDAD DEL CAUCA'); 
    pdf.add(this.crearTabla(this.seguimientos));
    pdf.create().download();
  }
  editarSeguimiento(row:Seguimiento)
  {
    console.log("EDITAR");
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
  crearTabla(body:any[])
  {
    let contf=0;
    let contc=0;
   /*  let row:any[]=[];
    row[0]="Nombre";row[1]="Tipo";row[2]="Tutor";row[3]="Estudiante";row[4]="Estado";row[5]="Coodirector";
    body[0]=row; */
    for(let seg of this.seguimientos)
    {
      let fila:any[]=[];
      if(contf==0)
      {
        fila[contc]="Nombre";contc++;
        fila[contc]="Tipo";contc++;
        fila[contc]="Tutor";contc++;
        fila[contc]="Estudiante";contc++;
        fila[contc]="Estado";contc++;
        fila[contc]="Coodirector";contc++; 
        console.log("FILA:  ",fila);
      }
      else
      {
        fila[contc]=seg.nombre;contc++;
        fila[contc]=seg.tipo;contc++;
        fila[contc]=seg.tutor;contc++;
        fila[contc]=seg.estudiante;contc++;
        fila[contc]=seg.estado;contc++;
        fila[contc]=seg.coodirector;contc++; 
        console.log("FILA:  ",fila);
      }      
      body[contf]=fila;contc=0;contf++;
    } 
    console.log("BODY:   ",body);
    return new Table(body).end;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  agregar() {
    //this.router.navigate(['/seguimiento/agregar']);
    this.bandListar=false;
  }
  /** Builds and returns a new User. */
  verSeguimiento(row:Seguimiento)
  {
    const dialogRef = this.dialog.open(VerSeguimientoComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.seguimiento=row;

  }
  cambiar(event)
  {
    this.bandListar=event;
  }



}

