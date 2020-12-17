import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Seguimiento } from '../../../seguimientos_admin/modelos/seguimiento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SeguimientoCompleto } from '../../../seguimientos_admin/modelos/seguimientoCompleto.model';

@Component({
  selector: 'app-ver-seguimiento-estudiante',
  templateUrl: './ver-seguimiento-estudiante.component.html',
  styleUrls: ['./ver-seguimiento-estudiante.component.css']
})
export class VerSeguimientoEstudianteComponent implements OnInit {
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];
  panelOpenState = false;
  seguimiento:SeguimientoCompleto;
  constructor(public dialogRef: MatDialogRef<VerSeguimientoEstudianteComponent> ,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.objEspec=[];
     this.formulario = this.formBuilder.group(
       {
         nombre: [{value:this.seguimiento.nombre, disabled:true},[]
         ],
         tipo: [{value:this.seguimiento.tipo.nombre, disabled:true}, []],
         tutor: [{value:this.seguimiento.tutor.nombre+' '+this.seguimiento.tutor.apellido, disabled:true}, []],
         estudiante: [{value:this.seguimiento.estudiante.getName()+' '+this.seguimiento.estudiante.getSurname(), disabled:true}, []],
         estado: [{value:this.seguimiento.estado.nombre,disabled:true}, []],
         coodirector: [{value: this.seguimiento.coodirector, disabled:true}, []],
         objetivoGeneral:[{value: this.seguimiento.oGeneral, disabled:true},[]],
         objetivosEspec:[{value:this.seguimiento.oEspecificos, disabled:true},[]],
         cohorte: [{value: this.seguimiento.estudiante.getCohorte(), disabled:true}, []],
         estadoSeguimiento: [{value: this.seguimiento.estadoSeguimiento.nombre, disabled:true}, []],
       });
 
 
       this.formulario.valueChanges.pipe(
         debounceTime(350)
         ).subscribe(
           value=>{})
 
  }
  separar()
  {
    console.log("PRESIONO ENTER")
  }
  
  ok()
  {
    this.dialogRef.close();
  }

}
