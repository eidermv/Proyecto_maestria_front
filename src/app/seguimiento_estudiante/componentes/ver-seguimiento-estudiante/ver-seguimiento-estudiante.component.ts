import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Seguimiento } from '../../../seguimientos_admin/modelos/seguimiento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-seguimiento-estudiante',
  templateUrl: './ver-seguimiento-estudiante.component.html',
  styleUrls: ['./ver-seguimiento-estudiante.component.css']
})
export class VerSeguimientoEstudianteComponent implements OnInit {
  panelOpenState = false;
  seguimiento:Seguimiento;
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];
  constructor(public dialogRef: MatDialogRef<VerSeguimientoEstudianteComponent> ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let oe:string="";
    let cont=1;
    this.objEspec=[];
    console.log("Seguimiento entrante###:  ",this.seguimiento);
   /*  for(let i of this.seguimiento.oEspecificos)
     {
        oe+=cont+". "+i+"\n";
        cont++;
     } 
    console.log("OBJETIVOS ESPEC:  ",this.seguimiento.oEspecificos);
     */
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, [Validators.required,
        Validators.maxLength(50)]
        ],
        tipo: [this.seguimiento.tipo, []],
        tutor: [this.seguimiento.tutor, []],
        estudiante: [this.seguimiento.estudiante, []],
        estado: [this.seguimiento.estado, []],        
        coodirector: [this.seguimiento.coodirector, []],
        objetivoGeneral:[this.seguimiento.oGeneral,[]],
        objetivosEspec:[this.seguimiento.oEspecificos,[]]
      });
      

      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
 
  }

  okClick() {
    this.dialogRef.close();
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

}
