import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { ActividadTutor } from './../../modelos/actividadTutor.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { SeguimientosTutorServices } from '../../servicios/seguimientosTutor.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import Swal from 'sweetalert2';

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
  constructor(private datePipe: DatePipe, public dialogRef: MatDialogRef<AgregarActividadComponent>,
    private seguimientoService: SeguimientosTutorServices,private actividadService:ActividadesTutorServices,
    private formBuilder:FormBuilder) {

    }

  ngOnInit() {
    this.actividad = new ActividadTutor();
    this.actividad.visible=0;
    this.seguimiento = this.seguimientoService.seguimiento;
    this.crearFormulario();

  }
  okClick() {
    this.dialogRef.close();
  }
  private crearFormulario():void{

    this.formulario = this.formBuilder.group(
      {
        semana: ['', [Validators.maxLength(30)]],
        cumplida: [null,  []],
        entregas: ['', [Validators.required]],
        fecha_inicio:[null, [ Validators.required]],
        fecha_entrega:[null, [Validators.required]],
        compromisos: ['', [Validators.required]],
        visibilidad:[this.checked, []],
      });
      this.formulario.get('semana').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('semana').valid){
            this.actividad.semana=this.formulario.get('semana').value;
          }
        }
      );
      this.formulario.get('cumplida').valueChanges.subscribe(
        value=>{
            if(value=="Cumplida"){
              this.actividad.cumplida=1;
            }
            else if(value=="No cumplida"){
              this.actividad.cumplida=0;
            }
          }
      );
      this.formulario.get('entregas').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('entregas').valid){
            this.actividad.entregas=this.formulario.get('entregas').value;
          }
        }
      );
      this.formulario.get('compromisos').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('compromisos').valid){
            this.actividad.compromisos = this.formulario.get('compromisos').value;
          }
        }
      );
      this.formulario.get('visibilidad').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('visibilidad').value==true){
            this.actividad.visible = 1;
          } else if(this.formulario.get('visibilidad').value==false){
            this.actividad.visible = 0;
          }
        }
      );
      this.formulario.get('fecha_inicio').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('fecha_inicio').valid){
            this.actividad.fechaInicio = value;
          }
        }
      );
      this.formulario.get('fecha_entrega').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('fecha_entrega').valid){
            this.actividad.fechaEntrega = value;
          }

        }
      );
  }
  onSubmit()
  {
    if (this.formulario.valid) {
      let seg={
        semana: this.actividad.semana,
        fecha_inicio: this.datePipe.transform(this.actividad.fechaInicio, "dd/MM/yyyy"),
        fecha_entrega: this.datePipe.transform(this.actividad.fechaEntrega, "dd/MM/yyyy"),
        entregas: this.actividad.entregas,
        compromisos: this.actividad.compromisos,
        cumplido:this.actividad.cumplida+"",
        id_seguimiento:this.seguimiento.idSeguimiento,
        visibilidad:this.actividad.visible+""
      };
      Swal.fire(
        'Exito!',
        '¡Actividad creada!',
        'success'
      );
      console.log(" ACTIVIDAD AGREGADA:   ",seg);
      this.actividadService.agregarActividad(seg);//crear servicio
      this.dialogRef.close();
    }
    else{
      Swal.fire(
        'Fallo!',
        '¡Actividad no creada!',
        'error'
      );
    }
    this.ngOnInit();
  }
  cancelar() {
    this.dialogRef.close();
  }
}
