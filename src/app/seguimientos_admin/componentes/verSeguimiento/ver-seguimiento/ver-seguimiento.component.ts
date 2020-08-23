import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../../modelos/seguimiento.model';
@Component({
  selector: 'app-ver-seguimiento',
  templateUrl: './ver-seguimiento.component.html',
  styleUrls: ['./ver-seguimiento.component.css']
})
export class VerSeguimientoComponent implements OnInit {
@Input() seguimiento:Seguimiento;
  constructor() { }

  ngOnInit(): void {
  }
  consultarSeguimiento()
  {
    
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
        '  <input type="text" class="form-control" disabled value="'+this.seguimiento.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+this.seguimiento.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+this.seguimiento.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+this.seguimiento.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control" disabled value="'+this.seguimiento.estado+'" aria-describedby="basic-addon1">' +
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

}
