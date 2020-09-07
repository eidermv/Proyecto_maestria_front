import { TutorService } from './../../servicios/tutor.service';
import { Tutor } from './../../modelos/tutor.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerTutorComponent } from '../ver-tutor/ver-tutor.component';

@Component({
  selector: 'app-listar-tutor',
  templateUrl: './listar-tutor.component.html',
  styleUrls: ['./listar-tutor.component.scss']
})
export class ListarTutorComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'correo', 'departamento' ,'universidad','opciones'];
  dataSource: MatTableDataSource<Tutor>;
  bandListar: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tutores: Array<Tutor> = [];
  constructor( private router: Router, private tutorService:TutorService,private dialog: MatDialog) {
    this.tutorService.onTutores();
    this.tutores=this.tutorService.tutores;
    this.dataSource = new MatTableDataSource(this.tutores);
  }

  ngOnInit(): void {
    
    // Assign the data to the data source for the table to render
    
    for(let i of this.dataSource.data)
    {
      console.log("TUTORES DATA SOURCE:  ", i);
    }
    this.bandListar=true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  verTutor(row:Tutor)
  {
     const dialogRef = this.dialog.open(VerTutorComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });    
    dialogRef.componentInstance.tutor=row; 
    console.log("ROW ASIGNADA Y ENVIADA",row);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  cambiar(event)
  {
    this.bandListar=event;
  }

}
