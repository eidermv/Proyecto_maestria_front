import { TutorCompleto } from './../../../modelos/tutorCompleto.model';
import { SeguimientoCompleto } from './../../../modelos/seguimientoCompleto.model';
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
import { TipoTutor } from '../../../modelos/tipoTutor.model';
@Component({
  selector: 'app-editar-seguimiento',
  templateUrl: './editar-seguimiento.component.html',
  styleUrls: ['./editar-seguimiento.component.css']
})
export class EditarSeguimientoComponent implements OnInit {
  @Input() seguimiento:SeguimientoCompleto;
  formulario: FormGroup;
  porcentaje:number;
  YEAR_END_COHORTE: number;
  options: TutorCompleto[] = [];
  optionsCohorte: Array<string>;
  options2: Student[]=[];
  optionsEstadoSeguimiento:EstadoSeguimiento[]=[];
  optionsEstadoProyecto:EstadoProyecto[]=[];
  optionsTiposSeguimiento:TipoSeguimiento[]=[];
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private tutorService: TutorService, private estudianteService:EstudianteService, public dialogoReg:MatDialogRef<EditarSeguimientoComponent>, private seguimientoService:SeguimientosService) 
  {  
    this.YEAR_END_COHORTE = 2008;
    this.optionsCohorte = [];   
   }

  ngOnInit(): void {
    console.log("SEGUIMIENTO RECIBIDO EN EDITAR:  ",this.seguimiento);
    this.crearFormulario();
    this.getAllCohorte();
    this.getAllTutores();
    this.getAllEstudiantes();
    this.getAllEstadosSeguimiento();
    this.getAllEstadosProyecto();
    this.getAllTiposSeguimiento();
  }
  getAllTiposSeguimiento() {
    this.seguimientoService.onTiposSeguimiento().subscribe(
      result=>{  this.optionsTiposSeguimiento=[];
        result.data.forEach(element => {
          let ots:TipoSeguimiento={
            id:element.idTipoSeguimiento,
            nombre:element.nombre
          }
          this.optionsTiposSeguimiento.push(ots);
        });       
      }
    )
  }
  getAllEstadosProyecto() {
    this.seguimientoService.onEstadosProyecto().subscribe(
      result=>{this.optionsEstadoProyecto=[];
        result.data.forEach(element => {
          let oep:EstadoProyecto={
            id:element.idEstadoSeguimiento,
            nombre:element.nombre
          }
          this.optionsEstadoProyecto.push(oep);
        });
      }
    )
  }
  getAllEstadosSeguimiento() {
    this.seguimientoService.onEstadosSeguimientos().subscribe(
      result=>{this.optionsEstadoSeguimiento=[];
        result.data.forEach(element => {
          let oes:EstadoSeguimiento={
            id:element.idEstadoSeguimiento,
            nombre:element.nombre
          }
          this.optionsEstadoSeguimiento.push(oes);
        });
      }
    )
  }
  getAllEstudiantes() {
    this.estudianteService.onEstudiantes().subscribe(
      result=>{this.options2=[],
       result.forEach(element => {
         let est=new Student();
         est.setSurname(element.apellidos);
         est.setCodigo(element.codigo);
         est.setCohorte(element.cohorte);
         est.setState(element.estado);
         est.setId(element.id);
         est.setName(element.nombres);
         est.setEnteredSemester(element.semestre);
         est.setTutor(element.tutor.nombre+" "+element.tutor.apellido);
         this.options2.push(est);
       });
      }
    );
  }
  getAllTutores() {
    this.tutorService.getTutores().subscribe(
      result=>{ this.options=[];
        result.data.forEach(element => {
          let tipoTutor:TipoTutor={
            id:element.tipoTutor.idTipoTutor,
            nombre:element.tipoTutor.nombre
          };
          let tutor:TutorCompleto={
            identificacion:element.id_tutor,
            apellido:element.apellido,
            correo:element.correo,
            departamento:element.departamento,
            grupoInvestigacion:element.grupoInvestigacion,
            nombre:element.nombre,
            telefono:element.telefono,
            tipo:tipoTutor,
            universidad:element.universidad
          };
          this.options.push(tutor);
        });
        
      }
    )
  }
  //***************************EDITAR SEGUIMIENTO******* */
 
  onSubmit()
  {
    if (this.formulario.valid) 
    {
      console.log("FORMULARIO VALIDO");
      console.log("SEGUIMIENTO FORMADO:   ",this.seguimiento); 
       let seg={
        nombre:this.seguimiento.nombre,
        id_tutor:this.seguimiento.tutor.identificacion,
        codirector:this.seguimiento.coodirector,
        id_estudiante:this.seguimiento.estudiante.getId(),
        cohorte:this.seguimiento.cohorte+'',
        objetivoGeneral :this.seguimiento.oGeneral,
        objetivosEspecificos  :this.seguimiento.oEspecificos,
        idEstadoProyecto  :this.seguimiento.estado.id,
        idTipoSeguimiento:this.seguimiento.tipo.id,
        idEstadoSeguimiento:this.seguimiento.estadoSeguimiento.id,
        idSeguimiento :this.seguimiento.id
      };
       this.seguimientoService.onEditSeguimiento(seg).subscribe(
        result=>{console.log("RESULTADO EDITAR SEGUIMIENTO:   ",result);
        Swal.fire(
          'Exito!',
          'Seguimiento Almacenado!',
          'success'
        );}
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
        tipo: [null,  [/* Validators.required */]],
        tutor: [null, [/* Validators.required */]],
        estudiante: [null, [/* Validators.required */]],
        cohorte:[null, [/* Validators.required */]],
        estado: [null, [/* Validators.required */] ],
        objetivo:[this.seguimiento.oGeneral, [ Validators.required] ],        
        coodirector:[this.seguimiento.coodirector, [/* Validators.required */] ],
        estadoSeguimiento:[null, [/* Validators.required */]]
      });
     
      this.formulario.get('tipo').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
          this.seguimiento.tipo=value;
        }
      );
      this.formulario.get('tutor').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.tutor=value;         
        }
      );
      this.formulario.get('estudiante').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.estudiante=value;         
        }
      );
      this.formulario.get('estado').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.estado=value;
         
        }
      );
      this.formulario.get('cohorte').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.cohorte=value;
         //this.seguimiento.estudiante.setCohorte(value);        
        }
      );
      this.formulario.get('estadoSeguimiento').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.estadoSeguimiento=value;
        }
      );
      this.formulario.get('nombre').valueChanges.pipe(debounceTime(50)).subscribe(
        value=>{
         this.seguimiento.nombre=value;
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
