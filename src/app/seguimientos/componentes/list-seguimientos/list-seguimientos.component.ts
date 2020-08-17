import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

export interface Seguimiento {
  id:number,
  nombre: string;
  tipo: string;
  tutor: string;
  estudiante: string;
  estado: string;
}

/** Constants used to fill up our data base. */
const PROYECTS: string[] = [
  'TESIS1', 'TESIS2', 'TESIS3', 'TESIS4', 'TESIS5'
];
const TYPES: string[] = [
  'TESIS', 'PROPUESTA', 'TESIS', 'TESIS', 'PROPUESTA'
];
const TUTORS: string[] = [
  'CARLOS', 'COBOS', 'SANDRA', 'BUITRÓN', 'FRANCISCO', 'NESTOR', 'ARDILA', 'HENDRIS', 'DANIEL'
];
const STATUS: string[] = [
  'APROBADO', 'INICIADO', 'CANCELADO', 'NO APROBADO'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-list-seguimientos',
  templateUrl: './list-seguimientos.component.html',
  styleUrls: ['./list-seguimientos.component.css']
})
export class ListSeguimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'tutor', 'estudiante', 'estado', 'opciones'];
  dataSource: MatTableDataSource<Seguimiento>;
  id:number=0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() {
    // Create 100 users
    const seguimientos = Array.from({ length: 100 }, (_, k) => this.crearSeguimiento(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(seguimientos);
  }

  ngOnInit(): void {
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
  /** Builds and returns a new User. */
  crearSeguimiento(id: number): Seguimiento {
    
    const student = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    const tut = TUTORS[Math.round(Math.random() * (TUTORS.length - 1))] + ' ' +
      TUTORS[Math.round(Math.random() * (TUTORS.length - 1))].charAt(0) + '.';
    const proy = PROYECTS[Math.round(Math.random() * (PROYECTS.length - 1))];
    const type = TYPES[Math.round(Math.random() * (TYPES.length - 1))];
    const state = STATUS[Math.round(Math.random() * (STATUS.length - 1))];
    this.id+=1;
    const identificador=this.id;
    return {
      id: identificador,
      nombre: proy,
      tipo: type,
      tutor: tut,
      estudiante: student,
      estado: state
    };

  }
  consultarSeguimiento(row)
  {
    /* console.log("ROW OBTENIDA:  ",row); */
    Swal.fire({
      title: 'SEGUIMIENTO',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      html:
      '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Nombre</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+row.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+row.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+row.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+row.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+row.estado+'" aria-describedby="basic-addon1">' +
        '</div>'
        ,
      confirmButtonText: 'Aceptar',
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      
    }).then((result) => {
     if (
        /* Read more about handling dismissals below */
        result.isDismissed
      ) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }
  //***************************EDITAR SEGUIMIENTO******* */
  editarSeguimiento(row)
  {
    /* console.log("ROW OBTENIDA:  ",row); */
    Swal.fire({
      title: 'EDITAR SEGUIMIENTO',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      html:
      '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Nombre</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="nombre" value="'+row.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="tipo" value="'+row.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="tutor"  value="'+row.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="estudiante" value="'+row.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="estado" value="'+row.estado+'" aria-describedby="basic-addon1">' +
        '</div>'
        , 
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      confirmButtonColor: '#3085d6',
       preConfirm: () => {
       /*  this.ejemploService.consulta.next(Number((document.getElementById('nombre') as HTMLInputElement).value));
        */ 
       let nombre = (document.getElementById('nombre') as HTMLInputElement).value;
        if (nombre === ''){
          (document.getElementById('nombre') as HTMLStyleElement).style.borderColor = 'red';
          Swal.showValidationMessage('Ingrese nombre');
        } else {
          return [
            nombre
          ];
        }
      } 
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            title: 'Editado!',
          text: 'El Seguimiento ha sido Editado.' /* + JSON.stringify(result) */,
          icon: 'success',
          timer: 2500}
        );
      } else if (
        /* Read more about handling dismissals below */
        result.isDismissed
      ) {
        Swal.fire(
          'Cancelado',
          'El seguimiento No se Modificó',
          'error'
        );
      }
  });
}
  //***************************EDITAR SEGUIMIENTO******* */
  eliminarSeguimiento(row)
  {
    /* console.log("ROW OBTENIDA:  ",row); */
    Swal.fire({
      title: 'ELIMINAR SEGUIMIENTO',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      html:
      '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Nombre</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  disabled id="nombre" value="'+row.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="tipo" value="'+row.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="tutor"  value="'+row.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="estudiante" value="'+row.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="estado" value="'+row.estado+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<h3>Desea Eliminar el Seguimiento?</h3>', 
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      confirmButtonColor: '#3085d6'      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            title: 'Eliminado!',
          text: 'El Seguimiento ha sido Eliminado.' /* + JSON.stringify(result) */,
          icon: 'success',
          timer: 2500}
        );
      } else if (
        /* Read more about handling dismissals below */
        result.isDismissed
      ) {
        Swal.fire(
          'Cancelado',
          'El seguimiento No se Eliminó',
          'error'
        );
      }
  });
}
  
  
  
}

