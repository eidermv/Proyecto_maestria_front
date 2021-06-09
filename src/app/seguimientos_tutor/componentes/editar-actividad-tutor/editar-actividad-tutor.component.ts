import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Actividad } from '../../../seguimientos_admin/modelos/actividad.model';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import { SeguimientoTutorCompleto } from '../../modelos/seguimientoTutorCompleto.model';
import { DatePipe } from "@angular/common";
import Swal from 'sweetalert2';
import { cibLgtm } from '@coreui/icons';

@Component({
  selector: 'app-editar-actividad-tutor',
  templateUrl: './editar-actividad-tutor.component.html',
  styleUrls: ['./editar-actividad-tutor.component.css'],

})

export class EditarActividadTutorComponent implements OnInit {
  @Input() actividad: ActividadTutor;
  @Input() seguimiento: SeguimientoTutorCompleto;
  opcionesCumplido: String[] = ['Cumplida','No cumplida'];
  fi:string;
  fe:string;
  formulario:FormGroup;
  checked:boolean;
  constructor(private datePipe: DatePipe,public dialogRef: MatDialogRef<EditarActividadTutorComponent>,
    private actividadService:ActividadesTutorServices,
    private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario():void{
    if(this.actividad.visible==1){
       this.checked=true;
    }
    else {
      this.checked=false;
    }
    this.formulario = this.formBuilder.group(
      {
        semana: [this.actividad.semana, [Validators.maxLength(30)]],
        cumplida: [this.actividad.cumplida,[]],
        entregas: [this.actividad.entregas, [Validators.required]],
        fecha_inicio:[new Date(this.actividad.fechaInicio+''), [ Validators.required]],//revisar esta parte
        fecha_entrega:[new Date(this.actividad.fechaEntrega+''), [Validators.required] ],//revisar esta parte
        compromisos: [this.actividad.compromisos, [Validators.required]],
        visibilidad:[this.checked, [] ]
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
      this.formulario.get('fecha_inicio').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('fecha_inicio').valid){
            this.actividad.fechaInicio = this.datePipe.transform(value, "dd/MM/yyyy");
          }
        }
      );
      this.formulario.get('fecha_entrega').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('fecha_entrega').valid){
            this.actividad.fechaEntrega = this.datePipe.transform(value, "dd/MM/yyyy");
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
      this.formulario.get('visibilidad').valueChanges.subscribe(
        value=>{
          if(this.formulario.get('visibilidad').value==true){
            this.actividad.visible = 1;
          } else if(this.formulario.get('visibilidad').value==false){
            this.actividad.visible = 0;
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

     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{

        }
      );
  }
  onSubmit(){
    if (this.formulario.valid) {
      let seg={
        id_actividad: this.actividad.idActividad,
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
        '¡Actividad actualizada!',
        'success'
      );

      this.actividadService.editarActividad(seg);
      this.dialogRef.close();
    }
    else{
      Swal.fire(
        'Fallo!',
        '¡Actividad no actualizada!',
        'error'
      );
    }
    this.ngOnInit();
  }
  cancelar(){
    this.dialogRef.close();
  }
}
