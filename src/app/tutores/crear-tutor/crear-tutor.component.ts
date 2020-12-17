import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/*/sweetalert2.js';
import { TipoTutor } from '../../seguimientos_admin/modelos/tipoTutor.model';
import { Tutor } from '../../seguimientos_admin/modelos/tutor.model';
import { TutorService } from '../servicios/tutor.service';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.scss']
})
export class CrearTutorComponent implements OnInit {
  formulario: FormGroup;
  externo:boolean=false;
  optionsTiposTutor:TipoTutor[]=[];  
  @Output() tutor= new EventEmitter<Tutor>();
  constructor(public dialogoReg:MatDialogRef<CrearTutorComponent>,private formBuilder: FormBuilder, 
    private tutorService:TutorService) { }

  ngOnInit() {
    this.tutorService.onTiposTutor().subscribe(
      result=>{
        this.optionsTiposTutor=[];
        result.data.forEach(element => {
          let e:TipoTutor;
          e={
            id:element.idTipoTutor,
            nombre:element.nombre
          };
          this.optionsTiposTutor.push(e);
        });       
      }
    );
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        apellido: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        identificacion: ['', [Validators.required]],
        telefono: ['', []],
        correo: ['', [Validators.required,Validators.email]],        
        departamento:['',/* [Validators.required] */],
        grupoInvestigacion:['',/* [Validators.required] */],
        tipo: [null,[Validators.required]],
        universidad:['',[Validators.required]]
      });
      this.formulario.get('tipo').valueChanges.subscribe(
          value=>{  console.log(value); 
            if(value.nombre!=null&& value.nombre==='Externo')
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
        text: 'Tutor Almacenado!' ,
        footer: 'El tutor fué almacenado correctamente' 
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
        this.dialogoReg.close();


  }
  onCancel()
  {
    Swal.fire({
      icon: 'error',
      title: 'Cancelado' ,
      text: 'Tutor no Creado!',
      footer: 'El tutor no fué almacenado'
    })
    this.dialogoReg.close();
  }

}
