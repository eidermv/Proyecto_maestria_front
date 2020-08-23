import { Component, OnInit } from '@angular/core';
import { debounceTime, debounce, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Seguimiento } from '../../../modelos/seguimiento.model';
import { Observable } from 'rxjs/internal/Observable';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TutorService } from '../../../servicios/tutor.service';
import {MatDialog} from '@angular/material/dialog';
import { CrearTutorComponent } from '../../../../tutores/crear-tutor/crear-tutor.component';
import { EstudianteService } from '../../../servicios/estudiante.service';
import { Student } from '../../../../models/student';


@Component({
  selector: 'app-agregar-seguimiento',
  templateUrl: './agregar-seguimiento.component.html',
  styleUrls: ['./agregar-seguimiento.component.css']
})
export class AgregarSeguimientoComponent implements OnInit {
  YEAR_END_COHORTE: number;
  formulario: FormGroup;
  options: Tutor[] = [];
  filteredOptions: Observable<string[]>;  
  optionsCohorte: Array<string>;
  options2: Student[]=[];
  filteredOptions2: Observable<string[]>;
  cTutor: boolean = false;
  constructor(private formBuilder: FormBuilder, private tutorService: TutorService, private estudianteService:EstudianteService, private dialog: MatDialog) {
    this.tutorService.onTutores();
    this.estudianteService.onEstudiantes();
    this.YEAR_END_COHORTE = 2008;
    this.optionsCohorte = [];
  }
  crearTutor() {
    const dialogRef = this.dialog.open(CrearTutorComponent, {
      width: '600px',
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  ngOnInit(): void {
    this.getAllCohorte();
    this.options = this.tutorService.tutores;
    this.options2=this.estudianteService.estudiantes;
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
        Validators.maxLength(50)]
        ],
        tipo: ['', [Validators.required]],
        tutor: ['', [Validators.required]],
        estudiante: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        objetivo:['',[Validators.required]]
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
        value=>{
          console.log(value);            
        }
      );
  }
  private _filter(value: string): Tutor[] {
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
  onSubmit(event: Event) {

    event.preventDefault();
    console.log("COMPROBANDO");
    if (this.formulario.valid) {
      const value = this.formulario.value;
      console.log(value);
    }
    else {
      this.formulario.markAllAsTouched();
      //this.errorFormulario();
    }
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
  
}