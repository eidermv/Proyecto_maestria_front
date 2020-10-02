import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {
  actividad:ActividadTutor;
  fi:string;
  fe:string;
  formulario:FormGroup;
  checked:boolean;
  constructor(public dialogRef: MatDialogRef<AgregarActividadComponent>, 
    private actividadService:ActividadesTutorServices,
    private formBuilder:FormBuilder) { 

    }

  ngOnInit() {
    this.crearFormulario();
  }
  okClick() {
    this.dialogRef.close();
  }
  private crearFormulario():void{
  
    this.formulario = this.formBuilder.group(
      { 
        semana: [, [
        Validators.maxLength(30)]
        ],
        cumplido: [,  [/* Validators.required */]],
        entregas: [, [/* Validators.required */]],
        compromisos: [, [/* Validators.required */]],
        fecha_inicio:[, [ Validators.required]],
        fecha_entrega: [, [/* Validators.required */] ],   
        visibilidad:[, [/* Validators.required */] ]
      });
     
     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{         
          console.log(value);
        }
      );
  }
  onSubmit()
  {
    console.log("GUARDANDO DESDE EDITAR CTIVIDAD TUTOR");
  }

}
