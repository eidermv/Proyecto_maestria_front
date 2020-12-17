import { Component, OnInit } from '@angular/core';
import { Seguimiento } from '../../modelos/seguimiento.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.scss']
})
export class EditarSeguimientoComponent implements OnInit {
  seguimiento:Seguimiento;
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];
  panelOpenState = false;
  constructor(public dialogoReg:MatDialogRef<EditarSeguimientoComponent>,private formBuilder: FormBuilder) { }

  ngOnInit() {
   
  }
}
