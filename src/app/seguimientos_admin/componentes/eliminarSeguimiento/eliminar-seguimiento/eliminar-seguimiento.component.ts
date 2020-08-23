import { Component, OnInit, Input } from '@angular/core';
import { Seguimiento } from '../../../modelos/seguimiento.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-eliminar-seguimiento',
  templateUrl: './eliminar-seguimiento.component.html',
  styleUrls: ['./eliminar-seguimiento.component.css']
})
export class EliminarSeguimientoComponent implements OnInit {
  @Input() seguimiento:Seguimiento;
  constructor() { }

  ngOnInit(): void {
  }
  
  //***************************ELIMINAR SEGUIMIENTO******* */
  eliminarSeguimiento()
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
        '  <input type="text" class="form-control"  disabled id="nombre" value="'+this.seguimiento.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="tipo" value="'+this.seguimiento.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="tutor"  value="'+this.seguimiento.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="estudiante" value="'+this.seguimiento.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"   disabled id="estado" value="'+this.seguimiento.estado+'" aria-describedby="basic-addon1">' +
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
