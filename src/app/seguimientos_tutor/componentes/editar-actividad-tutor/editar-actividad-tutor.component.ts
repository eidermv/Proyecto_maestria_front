import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Actividad } from '../../../seguimientos_admin/modelos/actividad.model';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';


@Component({
  selector: 'app-editar-actividad-tutor',
  templateUrl: './editar-actividad-tutor.component.html',
  styleUrls: ['./editar-actividad-tutor.component.css']
})
export class EditarActividadTutorComponent implements OnInit {
  actividad:ActividadTutor;
  fi:string;
  fe:string;
  formulario:FormGroup;
  checked:boolean;
  constructor(public dialogRef: MatDialogRef<EditarActividadTutorComponent>, private actividadService:ActividadesTutorServices,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    //this.actividad=this.actividadService.actividades[0];
    this.crearFormulario();
  }
  okClick() {
    this.dialogRef.close();
  }
  private crearFormulario():void{
  console.log("ACTIVIDAD:  ",this.actividad);
    if(this.actividad.visible==0)
    {
       this.checked=true;
       console.log("VISIBILIDAD TRUE");
    }

    else
      {this.checked=false;
      console.log("VISIBILIDAD FALSO");}
    this.formulario = this.formBuilder.group(
      {
        semana: [this.actividad.semana, [
        Validators.maxLength(30)]
        ],
        cumplido: [this.actividad.cumplida,  [/* Validators.required */]],
        entregas: [this.actividad.entregas, [/* Validators.required */]],
        compromisos: [this.actividad.compromisos, [/* Validators.required */]],
        fecha_inicio:[this.actividad.fechaInicio, [ Validators.required]],
        fecha_entrega: [this.actividad.fechaEntrega, [/* Validators.required */] ],
        visibilidad:[this.checked, [/* Validators.required */] ]
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
