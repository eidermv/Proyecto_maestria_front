import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.css']
})
export class CrearTutorComponent implements OnInit {
  formulario: FormGroup;
  externo:boolean=false;
  @Output() tutor= new EventEmitter<Tutor>();
  constructor(public dialogoReg:MatDialogRef<CrearTutorComponent>,private formBuilder: FormBuilder) {


  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        apellido: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        identificacion: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        correo: ['', [Validators.required,Validators.email]],
        grupoInvestigacion:['',[Validators.required]],
        departamento:['',[Validators.required]],
        tipo: ['', [Validators.required]],
        universidad:['',[Validators.required]]
      });
      this.formulario.get('tipo').valueChanges.subscribe(
          value=>{
            if(value==2)
            {
              this.externo=true;
              this.formulario.get('universidad').setValue('');
            }

            else
            {
              this.externo=false;
              this.formulario.get('universidad').setValue('Universidad del Cauca');
            }
          }
        );
  }
  onSubmit(event:Event)
  {

      console.log("Guardado",event);
      Swal.fire({
        icon: 'success',
        title: 'Guardado' ,
        text: 'Tutor Almacenado!'/* ,
        footer: 'El tutor no fué almacenado' */
      });
      let nuevo :Tutor;
        nuevo={
            nombre:this.formulario.get('nombre').value,
            apellido:this.formulario.get('apellido').value,
            identificacion:this.formulario.get('identificacion').value,
            correo:this.formulario.get('correo').value,
            telefono:this.formulario.get('telefono').value,
            departamento:this.formulario.get('departamento').value,
            grupoInvestigacion:this.formulario.get('grupoInvestigacion').value,
            tipo:   this.formulario.get('tipo').value,
            universidad:this.formulario.get('universidad').value
        };
        this.tutor.emit(nuevo);


  }
  onCancel()
  {
    Swal.fire({
      icon: 'error',
      title: 'Cancelado' ,
      text: 'Tutor no Creado!',
      footer: 'El tutor no fué almacenado'
    })

  }
}
