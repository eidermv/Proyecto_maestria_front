import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent implements OnInit {
  actividad: ActividadTutor;
  seguimiento: SeguimientoTutorCompleto;
  opcionesCumplido: String[] = ['Cumplida','No cumplida'];
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
        cumplida: [null,  [Validators.required]],
        entregas: [, [Validators.required]],
        compromisos: [, [Validators.required]],
        fechaInicio:[null, [ Validators.required]],
        fechaEntrega: [null, [Validators.required]],
        visibilidad:[, [Validators.required]],
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
  cancelar() {
    this.dialogRef.close();
  }

}
