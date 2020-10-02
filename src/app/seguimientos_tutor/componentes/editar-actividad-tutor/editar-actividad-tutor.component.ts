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
  constructor(public dialogRef: MatDialogRef<EditarActividadTutorComponent>, private actividadService:ActividadesTutorServices,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.actividad=this.actividadService.actividades[0];
    this.crearFormulario();
  }
  okClick() {
    this.dialogRef.close();
  }
  private crearFormulario():void{
    this.formulario = this.formBuilder.group(
      { codigo:[this.actividad.id,[]],
        semana: [this.actividad.semana, [
        Validators.maxLength(30)]
        ],
        cumplido: [this.actividad.cumplido,  [/* Validators.required */]],
        entregas: [this.actividad.entregas, [/* Validators.required */]],
        compromisos: [this.actividad.compromisos, [/* Validators.required */]],
        fecha_inicio:[this.actividad.fecha_inicio, [ Validators.required]],
        fecha_entrega: [this.actividad.fecha_entrega, [/* Validators.required */] ],
        cumplio:[this.actividad.cumplido, [ ] ],        
        visibilidad:[this.actividad.visibilidad, [/* Validators.required */] ]
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
