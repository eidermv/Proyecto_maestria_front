import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Student } from '../../../../models/student';
import { EstadoSeguimiento } from '../../../modelos/estadoSeguimiento.model';
import { EstadoProyecto } from '../../../modelos/estadosProyecto.model';
import { Seguimiento } from '../../../modelos/seguimiento.model';
import { TipoSeguimiento } from '../../../modelos/tipoSeguimiento.model';
import { Tutor } from '../../../modelos/tutor.model';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { TutorService } from '../../../servicios/tutor.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SeguimientosService } from '../../../servicios/seguimientos.service';
import { CrearTutorComponent } from '../../tutores/crear-tutor/crear-tutor.component';
@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.css']
})
export class EditarSeguimientoComponent implements OnInit {
  @Input() seguimiento:Seguimiento;
  formulario: FormGroup;
  porcentaje:number;
  YEAR_END_COHORTE: number;
  options: Tutor[] = [];
  optionsCohorte: Array<string>;
  options2: Student[]=[];
  optionsEstadoSeguimiento:EstadoSeguimiento[]=[];
  optionsEstadoProyecto:EstadoProyecto[]=[];
  optionsTiposSeguimiento:TipoSeguimiento[]=[];
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private tutorService: TutorService, private estudianteService:EstudianteService, public dialogoReg:MatDialogRef<EditarSeguimientoComponent>, private seguimientoService:SeguimientosService) 
  {
    this.tutorService.onTutores();
    this.estudianteService.onEstudiantes();
    this.YEAR_END_COHORTE = 2008;
    this.optionsCohorte = [];
    this.optionsEstadoSeguimiento=this.seguimientoService.estadosSeguimientos();
    this.optionsEstadoProyecto=this.seguimientoService.estadosProyecto();
    this.optionsTiposSeguimiento=this.seguimientoService.tiposSeguimiento();
    console.log("Cohortes: "+this.optionsCohorte);
    console.log("E Seg: "+this.optionsEstadoSeguimiento);
    console.log("Cohortes: "+this.optionsCohorte);
   }

  ngOnInit(): void {
    this.crearFormulario();
    this.getAllCohorte();
    this.options = this.tutorService.tutores;
    this.options2=this.estudianteService.estudiantes;
  }
  //***************************EDITAR SEGUIMIENTO******* */
  editarSeguimiento()
  {
    
  }
  onSubmit()
  {
    if (this.formulario.valid) 
    {
      console.log("FORMULARIO VALIDO");    
      Swal.fire(
        'Exito!',
        'Seguimiento Almacenado!',
        'success'
      );
      this.dialogoReg.close();
    }
    else {
      console.log("FORMULARIO IN VALIDO");
      this.formulario.markAllAsTouched();
      //this.errorFormulario();
    }
    this.crearFormulario();
  }
  crearTutor()
  {
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '600px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.tutor.subscribe(
      result => {
        this.formulario.get('tutor').setValue(result.nombre+" "+result.apellido);
      }
    )
  }
  cancelar()
  {
    this.crearFormulario();
    Swal.fire(
      'Cancelado!',
      'Seguimiento no Almacenado!',
      'error'
    );
    this.dialogoReg.close();
  }
  private crearFormulario():void{
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.seguimiento.nombre, [Validators.required,
        Validators.maxLength(30)]
        ],
        tipo: [this.seguimiento.tipo,  [/* Validators.required */]],
        tutor: [this.seguimiento.tutor, [/* Validators.required */]],
        estudiante: [this.seguimiento.estudiante, [/* Validators.required */]],
        cohorte:[this.seguimiento.cohorte, [/* Validators.required */]],
        estado: [this.seguimiento.estado, [/* Validators.required */] ],
        objetivo:[this.seguimiento.oGeneral, [ Validators.required] ],        
        coodirector:[this.seguimiento.coodirector, [/* Validators.required */] ],
        estadoSeguimiento:[this.seguimiento.estadoSeguimiento, [/* Validators.required */]]
      });
     
     this.formulario.valueChanges.pipe(
      debounceTime(350)
      ).subscribe(
        value=>{
          console.log("VALUE:   ",value)
          let p=0;
          if(value.nombre !="") p++;
          if(value.tipo!=null) p++;
          if(value.tutor!=null) p++;
          if(value.estudiante!=null) p++;
          if(value.estado!="") p++;
          if(value.cohorte!=null) p++;
          if(value.objetivo!="") p++;
          if(value.coodirector!="") p++;
          if(value.estadoSeguimiento!=null) p++;          
          if(value.objetivo!="") p++;
          this.porcentaje=(10*p);
          console.log(value);
        }
      );
  }
  clearArray(arrayClear: Array<string>) {
    return arrayClear = [];
  }
  getAllCohorte() {// se llena un array con los años desde el 2000 hasta la fecha actual para usarlas en el combo cohorte estudiante
    const date = new Date();
    const dateYear = date.getFullYear();
    this.optionsCohorte = this.clearArray(this.optionsCohorte);
    this.optionsCohorte[0] = '' + dateYear;
    for (let i = 1; i <= (dateYear - this.YEAR_END_COHORTE); i++) {
      this.optionsCohorte[i] = '' + (dateYear - i);
    }
  }

}
