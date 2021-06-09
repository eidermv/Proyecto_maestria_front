import { TutorCompleto } from './../../../seguimientos_admin/modelos/tutorCompleto.model';
import { TutorService } from './../../servicios/tutor.service';
import { Tutor } from './../../modelos/tutor.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VerTutorComponent } from '../ver-tutor/ver-tutor.component';
import { CrearTutorComponent } from '../../../seguimientos_admin/componentes/tutores/crear-tutor/crear-tutor.component';
import { EditarTutorComponent } from '../../../seguimientos_admin/componentes/tutores/editar-tutor/editar-tutor.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-tutor',
  templateUrl: './listar-tutor.component.html',
  styleUrls: ['./listar-tutor.component.scss']
})
export class ListarTutorComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'correo', 'departamento' ,'universidad','opciones'];
  dataSource: MatTableDataSource<TutorCompleto>;
  bandListar: boolean;
  subs:Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tutores: Array<TutorCompleto> = [];
  constructor( private router: Router, private tutorService:TutorService,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.tutores=[];
    this.subs=this.tutorService.getTutores().subscribe(result=>{

      result.data?.forEach(element => {
        let tutor:TutorCompleto={
          apellido:element.apellido,
          correo:element.correo,
          departamento:element.departamento,
          grupoInvestigacion:element.grupoInvestigacion,
          identificacion:element.id_tutor,
          nombre:element.nombre,
          telefono:element.telefono,
          tipo:element.tipoTutor,
          universidad:element.universidad,
          id:element.id_tutor
        };
        this.tutores.push(tutor);
      });

      this.dataSource = new MatTableDataSource(this.tutores);
      this.bandListar=true;
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
  agregar() {
    //this.router.navigate(['/seguimiento/agregar']);
   /*  this.bandListar=false; */
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.subs.unsubscribe();
      this.ngOnInit();

    });


  }
  /** Builds and returns a new User. */
  verTutor(row:TutorCompleto)
  {
     const dialogRef = this.dialog.open(VerTutorComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.componentInstance.tutor=row;


    dialogRef.afterClosed().subscribe(result => {

    });

  }
  eliminarTutor(row:TutorCompleto)
  {
    Swal.fire({
      title: 'ELIMINAR TUTOR',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tutorService.eliminarTutor(parseInt(row.identificacion)).subscribe(
          result=>{

            if(result.estado=="exito"){
              Swal.fire(
                {
                  title: 'Eliminado!',
                text: 'El Tutor ha sido Eliminado.' /* + JSON.stringify(result) */,
                icon: 'success',
                timer: 2500}
              );
            }
            else{
              Swal.fire(
                {
                  title: 'No Eliminado!',
                text: 'El Tutor NO se ha sido Eliminado.' /* + JSON.stringify(result) */,
                icon: 'error',
                timer: 2500}
              );
            }
          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.isDismissed
      ) {
        Swal.fire(
          'Cancelado',
          'El Tutor No se Eliminó',
          'error'
        );
      }
  });
}

  editarTutor(row:TutorCompleto)
  {
     const dialogRef = this.dialog.open(EditarTutorComponent, {
      width: '800px',
      height:'500px',
      data:{}
    });
    dialogRef.componentInstance.tutor=row;


    dialogRef.afterClosed().subscribe(result => {

    });

  }
  cambiar(event)
  {
    this.bandListar=event;
  }

}
