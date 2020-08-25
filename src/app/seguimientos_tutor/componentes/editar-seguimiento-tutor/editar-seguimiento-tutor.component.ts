import { Seguimiento } from './../../../seguimientos_admin/modelos/seguimiento.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditarSeguimientoComponent } from './../../../seguimientos_admin/componentes/editarSeguimiento/editar-seguimiento/editar-seguimiento.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar-seguimiento-tutor',
  templateUrl: './editar-seguimiento-tutor.component.html',
  styleUrls: ['./editar-seguimiento-tutor.component.css']
})
export class EditarSeguimientoTutorComponent implements OnInit {
  formulario: FormGroup;
  seguimiento: Seguimiento;
  @Output()banNotificaciones = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, [Validators.required,
        Validators.maxLength(50)]
        ],
        tipo: [this.seguimiento.tipo, []],
        tutor: [this.seguimiento.tutor, []],
        estudiante: [this.seguimiento.estudiante, []],
        estado: [this.seguimiento.estado, []],
        objetivoGeneral:[this.seguimiento.oGeneral,[]],
        objetivosEspec:[this.seguimiento.oEspecificos,[]]
      });
  }
  volver() {
    //this.router.navigate(['/seguimientos_tutor/']);
    this.banNotificaciones.emit(true);
    console.log('emitido: ');
  }

}
