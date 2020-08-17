import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Seguimiento } from '../../../modelos/seguimiento.model';

@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.css']
})
export class EditarSeguimientoComponent implements OnInit {
  @Input() seguimiento:Seguimiento;
  constructor() { }

  ngOnInit(): void {
  }
  //***************************EDITAR SEGUIMIENTO******* */
  editarSeguimiento()
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
        '  <input type="text" class="form-control"  id="nombre" value="'+this.seguimiento.nombre+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tipo</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="tipo" value="'+this.seguimiento.tipo+'" aria-describedby="basic-addon1">' +
        '</div>'+'<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Tutor</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="tutor"  value="'+this.seguimiento.tutor+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estudiante</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="estudiante" value="'+this.seguimiento.estudiante+'" aria-describedby="basic-addon1">' +
        '</div>'+
        '<div class="input-group mb-3">' +
        '  <div class="input-group-prepend">' +
        '    <span class="input-group-text" >Estado</span>' +
        '  </div>\n' +
        '  <input type="text" class="form-control"  id="estado" value="'+this.seguimiento.estado+'" aria-describedby="basic-addon1">' +
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

}
