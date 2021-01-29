import { SeguimientoCompleto } from './../../../modelos/seguimientoCompleto.model';
import { TutorCompleto } from './../../../modelos/tutorCompleto.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { debounceTime, debounce, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Seguimiento } from '../../../modelos/seguimiento.model';
import { Observable } from 'rxjs/internal/Observable';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TutorService } from '../../../servicios/tutor.service';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { Student } from '../../../../models/student';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CrearTutorComponent } from '../../tutores/crear-tutor/crear-tutor.component';
import { EstadoSeguimiento } from '../../../modelos/estadoSeguimiento.model';
import { SeguimientosService } from '../../../servicios/seguimientos.service';
import { EstadoProyecto } from '../../../modelos/estadosProyecto.model';
import { TipoSeguimiento } from '../../../modelos/tipoSeguimiento.model';
import { TipoTutor } from '../../../modelos/tipoTutor.model';


@Component({
  selector: 'app-agregar-seguimiento',
  templateUrl: './agregar-seguimiento.component.html',
  styleUrls: ['./agregar-seguimiento.component.css']
})
export class AgregarSeguimientoComponent implements OnInit {
  YEAR_END_COHORTE: number;
  formulario: FormGroup;
  options: TutorCompleto[] = [];
  filteredOptions: Observable<string[]>;
  optionsCohorte: Array<string>;
  options2: Student[] = [];
  optionsEstadoSeguimiento: EstadoSeguimiento[] = [];
  optionsEstadoProyecto: EstadoProyecto[] = [];
  optionsTiposSeguimiento: TipoSeguimiento[] = [];
  filteredOptions2: Observable<string[]>;
  cTutor: boolean = false;
  nuevoTutor: Tutor;
  porcentaje: number = 0;
  @Output() bandAgregar = new EventEmitter<boolean>();
  @Output() seguimientoCreado = new EventEmitter<SeguimientoCompleto>();
  
  constructor(private formBuilder: FormBuilder, private tutorService: TutorService, private estudianteService: EstudianteService, private dialog: MatDialog, private seguimientoService: SeguimientosService) {
    this.tutorService.onTutores();
    this.YEAR_END_COHORTE = 2008;
    this.optionsCohorte = [];
  }

  ngOnInit(): void {    
    console.log("ON INIT DEL AGREGAR");
    this.getAllCohorte();
    this.getAllTutores();
    this.getAllEstudiantes();
    this.getAllEstadosSeguimiento();
    this.getAllEstadosProyecto();
    this.getAllTiposSeguimiento();
    this.crearFormulario();
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
          console.log("TUTOR:   ",element);
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
            universidad:element.universidad,
            id:element.id_tutor
          };
          this.options.push(tutor);
        });
        
      }
    )
  }
  //TODO
  onSubmit(event: Event) {
    if (this.formulario.valid) {

      let seg={
        nombre:this.formulario.get('nombre').value,
        id_tutor:this.formulario.get('tutor').value.id,
        codirector:this.formulario.get('coodirector').value,
        id_estudiante:this.formulario.get('estudiante').value.id,
        cohorte:this.formulario.get('cohorte').value,
        objetivoGeneral:this.formulario.get('objetivo').value,
        objetivosEspecificos:'',
        id_estado_proyecto:this.formulario.get('estado').value.id,
        id_tipo_seguimiento:this.formulario.get('tipo').value.id,
        id_estado_seguimiento:this.formulario.get('estadoSeguimiento').value.id
      };
      console.log("$$$$$$$$$$$$$$$$$ SEGUIMIENTO FORMADO:   ",seg);
      this.seguimientoService.onCrearSeguimiento(seg).subscribe(
        result=>{
          console.log("REESULT EN AGREGAR SEGUIMIENTO:   ",result);
         /*  if(result.body?.estado=="exito"){ */
            this.bandAgregar.emit(true);
            Swal.fire(
              'Exito!',
              'Seguimiento Almacenado!',
              'success'
            )
         /*  }
          else{
            Swal.fire(
              'Error!',
              'El seguimiento NO ha sido Almacenado!',
              'error'
            )
          } */
         
        }
      );
      
      this.bandAgregar.emit(true);
     
      
    }
    else {
      console.log("FORMULARIO IN VALIDO");
      this.formulario.markAllAsTouched();
      //this.errorFormulario();
    }
    this.crearFormulario();
  }
  crearTutor() {
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.tutor.subscribe(
      result => {
        this.formulario.get('tutor').setValue(result.nombre + " " + result.apellido);
      }
    )
  }
  
  private crearFormulario(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
        Validators.maxLength(30)]
        ],
        tipo: [null,  [/* Validators.required */]],
        tutor: [null, [/* Validators.required */]],
        estudiante: [null, [/* Validators.required */]],
        cohorte:[null, [/* Validators.required */]],
        estado: [null, [/* Validators.required */] ],
        objetivo:['', [ Validators.required] ],        
        coodirector:['', [/* Validators.required */] ],
        estadoSeguimiento:[null, [/* Validators.required */]]
      });
     
      
    this.filteredOptions = this.formulario.get('tutor').valueChanges.pipe(debounceTime(350),
      /* startWith(''), */
      map(value => this._filter(value).map(v2 => v2.nombre))
    );
    this.filteredOptions2 = this.formulario.get('estudiante').valueChanges.pipe(debounceTime(350),
      /* startWith(''), */
      map(value => this._filter2(value).map(v2 => v2.getName()))
    );
    this.formulario.valueChanges.pipe(
      debounceTime(350)
    ).subscribe(
      value => {
        console.log("VALUE:   ", value)
        let p = 0;
        if (value.nombre != "") p++;
        if (value.tipo != null) p++;
        if (value.tutor != null) p++;
        if (value.estudiante != null) p++;
        if (value.estado != "") p++;
        if (value.cohorte != null) p++;
        if (value.objetivo != "") p++;
        if (value.coodirector != "") p++;
        if (value.estadoSeguimiento != null) p++;
        if (value.objetivo != "") p++;
        this.porcentaje = (10 * p);
        console.log(value);
      }
    );
  }
  private _filter(value: string): TutorCompleto[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      if (option.nombre.toLowerCase().indexOf(filterValue) === 0) {
        return option
      }
    });
  }
  private _filter2(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => {
      if (option.getName().toLowerCase().indexOf(filterValue) === 0) {
        return option
      }
    });
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
  listar(event) {

  }
  getNombreField() {
    this.formulario.get('nombre');
  }
  getTipoField() {
    this.formulario.get('tipo');
  }
  getTutorField() {
    this.formulario.get('tutor');
  }
  getEstudianteField() {
    this.formulario.get('estudiante');
  }
  clearArray(arrayClear: Array<string>) {
    return arrayClear = [];
  }
  cancelar() {
    this.crearFormulario();
    this.bandAgregar.emit(true);
    Swal.fire(
      'Cancelado!',
      'Seguimiento no Almacenado!',
      'error'
    )
  }
  

  errorFormulario() {
    Swal.fire({
      title: 'Campos sin Llenar',
      allowOutsideClick: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      confirmButtonText: 'Ok',
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
    });
  }
  formularioValido(): boolean {
    return this.formulario.valid;
  }
  getNombreValid(): boolean { return this.formulario.get('nombre').valid }
  getNombreInvalid(): boolean { return !this.formulario.get('nombre').valid }
  getTipoValid(): boolean { return this.formulario.get('tipo').valid; }
  getTutorValid(): boolean { return this.formulario.get('tutor').valid; }
  getEstudianteValid(): boolean { return this.formulario.get('estudiante').valid; }
  getEstadoValid(): boolean { return this.formulario.get('estado').valid; }
  getCohorteValid(): boolean { return this.formulario.get('cohorte').valid; }
  getCoodirectorValid(): boolean { return this.formulario.get('coodirector').valid; }

}
