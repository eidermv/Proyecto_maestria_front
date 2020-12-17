import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { SeguimientoCompleto } from './../../../seguimientos_admin/modelos/seguimientoCompleto.model';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {
  actividad: ActividadTutor;
  seguimiento: SeguimientoTutorCompleto;
  fi:string;
  fe:string;
  formulario:FormGroup;
  checked:boolean;
  constructor(public dialogRef: MatDialogRef<AgregarActividadComponent>,
    private seguimientoService: SeguimientosTutorServices,
    private formBuilder:FormBuilder) {

    }

  ngOnInit() {
    this.seguimiento = this.seguimientoService.seguimiento;
    this.crearFormulario();

  }
  okClick() {
    this.dialogRef.close();
  }
  private crearFormulario():void{

    this.formulario = this.formBuilder.group(
      {
        semana: [, [Validators.maxLength(30)]],
        cumplida: [,  [Validators.required]],
        entregas: [, [Validators.required]],
        compromisos: [, [Validators.required]],
        fechaInicio:[, [ Validators.required]],
        fechaEntrega: [, [Validators.required]],
        visible:[, [Validators.required]],
        idSeguimiento: [this.seguimiento.idSeguimiento, [Validators.required]]
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
