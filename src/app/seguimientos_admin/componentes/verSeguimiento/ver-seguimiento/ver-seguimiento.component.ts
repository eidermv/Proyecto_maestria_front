import { SeguimientoCompleto } from './../../../modelos/seguimientoCompleto.model';
import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-ver-seguimiento',
  templateUrl: './ver-seguimiento.component.html',
  styleUrls: ['./ver-seguimiento.component.css']
})
export class VerSeguimientoComponent implements OnInit {
seguimiento:SeguimientoCompleto;
  constructor(public dialogoReg:MatDialogRef<VerSeguimientoComponent>,private formBuilder: FormBuilder) { }
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];
  panelOpenState = false;

  ngOnInit(): void {
    this.objEspec=[];
   /*  for(let i of this.seguimiento.oEspecificos)
     {
        oe+=cont+". "+i+"\n";
        cont++;
     }
    console.log("OBJETIVOS ESPEC:  ",this.seguimiento.oEspecificos);
     */

    this.formulario = this.formBuilder.group(
      {
        nombre: [{value:this.seguimiento.nombre, disabled:true},[]
        ],
        tipo: [{value:this.seguimiento.tipo.nombre, disabled:true}, []],
        tutor: [{value:this.seguimiento.tutor.nombre+' '+this.seguimiento.tutor.apellido, disabled:true}, []],
        estudiante: [{value:this.seguimiento.estudiante.getName()+' '+this.seguimiento.estudiante.getSurname(), disabled:true}, []],
        estado: [{value:this.seguimiento.estado.nombre,disabled:true}, []],
        coodirector: [{value: this.seguimiento.coodirector, disabled:true}, []],
        objetivoGeneral:[{value: this.seguimiento.oGeneral, disabled:true},[]],
        objetivosEspec:[{value:this.seguimiento.oEspecificos, disabled:true},[]],
        cohorte: [{value: this.seguimiento.estudiante.getCohorte(), disabled:true}, []],
        estadoSeguimiento: [{value: this.seguimiento.estadoSeguimiento.nombre, disabled:true}, []],
      });


      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
  }
  separar()
  {
    console.log("PRESIONO ENTER")
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
  ok()
  {
    this.dialogoReg.close();
  }
}
