import { debounceTime } from 'rxjs/operators';
import { TutorCompleto } from './../../../modelos/tutorCompleto.model';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TipoTutor } from '../../../modelos/tipoTutor.model';
import { TutorService } from '../../../servicios/tutor.service';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.scss']
})
export class EditarTutorComponent implements OnInit {

  formulario: FormGroup;
  externo:boolean=false;
  tutor:TutorCompleto;
  defaultValue="";
  
  optionsTiposTutor:TipoTutor[]=[];
  constructor(public dialogoReg:MatDialogRef<EditarTutorComponent>,private formBuilder: FormBuilder,
    private tutorService:TutorService) {
  }
  ngOnInit(): void {
    this.tutorService.onTiposTutor().subscribe(result=>{
      this.optionsTiposTutor=[];
     result.data.forEach(element => {
       let tipoT:TipoTutor={
         id:element.idTipoTutor,
         nombre:element.nombre
       }
       this.optionsTiposTutor.push(tipoT)
     });
    });
    this.defaultValue=this.tutor.tipo.nombre;
    this.crearFormulario();
      
  }
  onSubmit(event:Event)
  {
     console.log("TIPO:   ",this.tutor);
      let nuevo ={
            
            id_tutor:this.tutor.identificacion,
            nombres:this.tutor.nombre,
            apellidos:this.tutor.apellido,
            identificacion:this.tutor.identificacion,
            correo:this.tutor.correo,
            telefono:this.tutor.telefono,
            departamento:this.tutor.departamento,
            grupo_investigacion:this.tutor.grupoInvestigacion,
            id_tipo_tutor:   this.tutor.tipo.id,
            universidad:this.tutor.universidad
        };
        console.log("tutor formado para enviar:  ",nuevo);
        this.tutorService.onEditTutor(nuevo).subscribe(result=>{
        console.log("RESULTADO DE GUARDAR EL TUTOR EDITADO",result);
        })
        //GUARDAR 
        this.dialogoReg.close();


  }
  crearFormulario(){
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.tutor.nombre, [Validators.required,
          Validators.maxLength(50)]
          ],
        apellido: [this.tutor.apellido, [Validators.required,
          Validators.maxLength(50)]
          ],
        identificacion: [this.tutor.identificacion, [Validators.required]],
        telefono: [this.tutor.telefono, []],
        correo: [this.tutor.correo, [Validators.required,Validators.email]],
        grupoInvestigacion:[this.tutor.grupoInvestigacion,[]],
        departamento:[this.tutor.departamento,[]],
        tipo: [null,[Validators.required]],
        universidad:[this.tutor.universidad,[Validators.required]]
      });
      this.formulario.get('nombre').valueChanges.pipe(debounceTime(1000)).subscribe(
        value=>{
          console.log("Tutor    :",this.tutor);
          this.tutor.nombre=value;

        });
        this.formulario.get('apellido').valueChanges.pipe(debounceTime(1000)).subscribe(
          value=>{
            console.log("Tutor    :",this.tutor);
            this.tutor.apellido=value;
          });
          this.formulario.get('identificacion').valueChanges.pipe(debounceTime(1000)).subscribe(
            value=>{
              console.log("Tutor    :",this.tutor);
              this.tutor.identificacion=value;
            });
            this.formulario.get('telefono').valueChanges.pipe(debounceTime(1000)).subscribe(
              value=>{
                console.log("Tutor    :",this.tutor);
                this.tutor.telefono=value;
              });
              this.formulario.get('correo').valueChanges.pipe(debounceTime(1000)).subscribe(
                value=>{
                  console.log("Tutor    :",this.tutor);
                  this.tutor.correo=value;
                });
                this.formulario.get('grupoInvestigacion').valueChanges.pipe(debounceTime(1000)).subscribe(
                  value=>{
                    console.log("Tutor    :",this.tutor);
                    this.tutor.grupoInvestigacion=value;
                  });
                  this.formulario.get('departamento').valueChanges.pipe(debounceTime(1000)).subscribe(
                    value=>{
                      console.log("Tutor    :",this.tutor);
                      this.tutor.departamento=value;
                    });
                  
            this.formulario.get('tipo').valueChanges.subscribe(
          value=>{
            console.log("Tutor    :",this.tutor);
            this.tutor.tipo.id=value.id;
            this.tutor.tipo.nombre=value.nombre;
            if(value.nombre!=null&& value.nombre=='Externo')
            {
              this.externo=true;
              
              this.formulario.get('universidad').setValue('');
            }
            else
            {
              this.externo=false;
              this.formulario.get('universidad').setValue('Universidad del Cauca');
              this.tutor.universidad='Universidad del Cauca';
            }
          }
        );
        this.formulario.get('universidad').valueChanges.pipe(debounceTime(1000)).subscribe(
          value=>{
            console.log("Tutor    :",this.tutor);
            this.tutor.universidad=value;
          });
        
  }
  onCancel()
  {
    Swal.fire({
      icon: 'error',
      title: 'Cancelado' ,
      text: 'Tutor no Editado!',
      footer: 'El tutor no fué Editado'
    });
    this.dialogoReg.close();

  }

}
