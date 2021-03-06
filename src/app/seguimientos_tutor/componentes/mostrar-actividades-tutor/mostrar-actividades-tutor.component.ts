import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { SeguimientoTutorCompleto } from '../../modelos/seguimientoTutorCompleto.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import { AgregarActividadComponent } from '../agregar-actividad/agregar-actividad.component';
import { EditarActividadTutorComponent } from '../editar-actividad-tutor/editar-actividad-tutor.component';

@Component({
  selector: 'app-mostrar-actividades-tutor',
  templateUrl: './mostrar-actividades-tutor.component.html',
  styleUrls: ['./mostrar-actividades-tutor.component.css']
})
export class MostrarActividadesTutorComponent implements OnInit {
  seguimientoTutor: SeguimientoTutorCompleto;
  actividades: ActividadTutor[]=[];
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Tipo', 'Estudiante', 'Estado', 'Accion'];
  dataSource: MatTableDataSource<ActividadTutor>;
  formulario:FormGroup;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private datePipe :DatePipe, private dialog: MatDialog , private actividadesTutorService: ActividadesTutorServices,
    private seguimientoTutorService: SeguimientosTutorServices,  private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.actividades = [];
    this.seguimientoTutor = new SeguimientoTutorCompleto();
    this.seguimientoTutor = this.seguimientoTutorService.seguimiento;
    this.cargarActividades();
    //this.crearFormulario();
  }
  private crearFormulario():void{

    this.formulario = this.formBuilder.group(
      {
        visibilidad:[false, [] ]
      });


      this.formulario.get('visibilidad').valueChanges.subscribe(
        value=>
        {
          let mensaje="";
          if(value){
           mensaje="Desea hacer visibles todas las actividades ?"
          }
          else{
            mensaje="Desea hacer no visibles todas las actividades ?"
          }
//////////////inicio
Swal.fire({
  title: mensaje,
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
           if(this.formulario.get('visibilidad').value==true)
           {
            for(let actividad of this.actividades){
              let seg={
                id_actividad: actividad.idActividad,
                semana: actividad.semana,
                fecha_inicio: this.datePipe.transform(actividad.fechaInicio, "dd/MM/yyyy"),
                fecha_entrega: this.datePipe.transform(actividad.fechaEntrega, "dd/MM/yyyy"),
                entregas: actividad.entregas,
                compromisos: actividad.compromisos,
                cumplido:actividad.cumplida+"",
                id_seguimiento:this.seguimientoTutor.idSeguimiento,
                visibilidad:(1-actividad.visible)+""
              };
              this.actividadesTutorService.editarActividad(seg);
            }
            Swal.fire(
              'Exito!',
              '¡Actividades actualizadas!',
              'success'
            );
          }
  } else if (
    /* Read more about handling dismissals below */
    result.isDismissed
  ) {
    /* Swal.fire(
      '',
      'El seguimiento No se Eliminó',
      'error'
    ); */
    this.formulario.get('visibilidad').setValue(!this.formulario.get('visibilidad').value);
  }
});
/////////////////FIN
/*
           */
        }
      );

  }
  enviarActividades(){
    Swal.fire({
      title: '¡Mensaje de confirmación!',
      text: '¿Está seguro que desea hacer visible todas las actividades al Coordinador?',
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.value) {
        for(let actividad of this.actividades){
          let seg={
            id_actividad: actividad.idActividad,
            semana: actividad.semana,
            fecha_inicio: this.datePipe.transform(actividad.fechaInicio, "dd/MM/yyyy"),
            fecha_entrega: this.datePipe.transform(actividad.fechaEntrega, "dd/MM/yyyy"),
            entregas: actividad.entregas,
            compromisos: actividad.compromisos,
            cumplido:actividad.cumplida+"",
            id_seguimiento:this.seguimientoTutor.idSeguimiento,
            visibilidad:1+""
          };
          this.actividadesTutorService.editarActividad(seg);
        }
        Swal.fire(
          'Exito!',
          'Todas las actividades visibles.',
          'success'
        )
        this.actividades=[];
        this.ngOnInit();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se han modificado las actividades',
          'error'
        )
      }
    })
  }
  cargarActividades(){
    this.actividades=[];
    this.actividadesTutorService.obtenerActividadesTutor(this.seguimientoTutor.idSeguimiento).subscribe((data) => {
      if (data.estado === 'exito') {
        data.data.forEach( (item) => {
          const actividadesE: ActividadTutor = item;
          this.actividades.push(actividadesE);
        });
        this.dataSource = new MatTableDataSource(this.actividades);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      console.log("ACTIVIDADES OBTENIAS DEL SERVICIO: ",this.actividades);
    });
  }
  agregarActividad() {
    const dialogRef = this.dialog.open(AgregarActividadComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  editarActividad(elem: ActividadTutor) {
    let act:ActividadTutor={...elem};
    const dialogRef = this.dialog.open(EditarActividadTutorComponent, {
      width: '700px', height: '600px',
      data: {
      }
    });
    dialogRef.componentInstance.actividad = act;
    dialogRef.componentInstance.seguimiento=this.seguimientoTutor;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  eliminarActividad(element: ActividadTutor){
    Swal.fire({
      title: '¡Mensaje de confirmación!',
      text: '¿Está seguro que desea eliminar esta actividad?',
      //icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SI',
      cancelButtonText: 'NO'
    }).then((result) => {
      if (result.value) {
        this.actividadesTutorService.eliminarActividadTutor(element.idActividad).subscribe(
          (result) => {
            if(result.estado ==='exito'){
              Swal.fire(
                'Exito!',
                'La actividad ha sido eliminada.',
                'success'
              )
              this.actividades=[];
              this.ngOnInit();
            }
            else{
              Swal.fire(
                'Cancelado',
                'ha ocurrido un error al eliminar la actividad',
                'error'
              )
            }
        });

      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se ha eliminado la actividad',
          'error'
        )
      }
    })
  }
}
