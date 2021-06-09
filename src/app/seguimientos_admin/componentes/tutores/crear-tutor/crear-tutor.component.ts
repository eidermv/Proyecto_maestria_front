import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TutorService } from '../../../servicios/tutor.service';
import { TipoTutor } from '../../../modelos/tipoTutor.model';
import { TutorCompleto } from '../../../modelos/tutorCompleto.model';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.css']
})
export class CrearTutorComponent implements OnInit {
  formulario: FormGroup;
  externo:boolean=false;
  optionsTiposTutor:TipoTutor[]=[];
  subs:Subscription;
  @Output() tutor= new EventEmitter<Tutor>();
  constructor(public dialogoReg:MatDialogRef<CrearTutorComponent>,private formBuilder: FormBuilder,
    private tutorService:TutorService) {


  }
  ngOnInit(): void {



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
          value=>{
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


      let nuevo;
        nuevo={
            nombres:this.formulario.get('nombre').value,
            apellidos:this.formulario.get('apellido').value,
            identificacion:this.formulario.get('identificacion').value,
            correo:this.formulario.get('correo').value,
            telefono:this.formulario.get('telefono').value,
            departamento:this.formulario.get('departamento').value,
            grupo_investigacion:this.formulario.get('grupoInvestigacion').value,
            id_tipo_tutor:   this.formulario.get('tipo').value.id,
            universidad:this.formulario.get('universidad').value
        };
        this.subs= this.tutorService.onCrearTutor(nuevo).subscribe(result=>{
         /*  if(result.body?.estado=="exito"){ */
            Swal.fire({
              icon: 'success',
              title: 'Guardado' ,
              text: 'Tutor Almacenado!' ,
              footer: 'El tutor fué almacenado correctamente'
            });
          /* }
          else{
            Swal.fire({
              icon: 'error',
              title: 'NO Guardado' ,
              text: 'Tutor NO Almacenado!' ,
              footer: 'El tutor NO fué almacenado'
            });
          } */
        });
        this.subs.unsubscribe();
        this.tutor.emit(nuevo);
        this.dialogoReg.close(nuevo);


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
