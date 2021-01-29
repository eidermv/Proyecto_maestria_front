import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/*/sweetalert2.js';
import { TipoTutor } from '../../seguimientos_admin/modelos/tipoTutor.model';
import { Tutor } from '../../seguimientos_admin/modelos/tutor.model';
import { TutorService } from '../servicios/tutor.service';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.scss']
})
export class CrearTutorComponent implements OnInit {
  formulario: FormGroup;
  externo:boolean=false;
  optionsTiposTutor:TipoTutor[]=[];  
  @Output() tutor= new EventEmitter<Tutor>();
  constructor(public dialogoReg:MatDialogRef<CrearTutorComponent>,private formBuilder: FormBuilder, 
    private tutorService:TutorService) { }

  ngOnInit() {
   
  }
 

}
