import { TutorService } from './../../../tutores/servicios/tutor.service';
import { tutor } from './../../../models/student';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators, EmailValidator, NgForm } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html'
})
export class FormStudentComponent implements OnInit, OnChanges {

  /*************************VARIABLES GLOBALES************* */
  YEAR_END_COHORTE: number;
  DEFAULT_dATE: string; // esta variable se inicializa en 1 por que el semestre no se va a utilizar por ahora,
                        // pero para otras maestrias puede ser de gran ayuda
  IS_TUTOR: boolean;
  IS_NOT_TUTOR: boolean;
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /***********************VARIABLES LOCALES***************** */
  @Input() studenEdit: {code: string, name: string, surname: string, tutor: tutor, email: string, cohorte: string,
                        state: string, semesterEntered: string, enteredBy: string};
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  @Input() resetForm: {resetForm: string};
  @Input() isFormAddStudent: {isFormAddStudent: boolean};
  @ViewChild('tutor') cbx_tutorStudent: any;
  @ViewChild('cohorteStudent') cbx_cohorteStudent: any;
  @ViewChild('state') cbx_stateStudent: any;
  @ViewChild('semester') cbx_semesterStudent: any;
  @ViewChild('enteredBy') cbx_enteredByStudent: any;
  @ViewChild('f') form: NgForm ;
  optionsCohorte: Array<string>;
  optionsState: Array<string>;
  optionsEnteredSemester: Array<string>;
  optionsModeEntered: Array<string>;
  optionsTutor: Array<any>;

  /************************VARIABLES DE INSTANCIA********** */
  @Output() getStudent = new EventEmitter<{id: string, name: string, surname: string, tutor: string, email: string, cohorte: string,
                                          state: string, semesterEntered: string, enteredBy: string}>();
  fieldsForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private studentService: StudentService,
    private tutorService:TutorService) {
    this.stringValidation = new StringValidation();
    this.YEAR_END_COHORTE = 2008;
    this.DEFAULT_dATE = '1';
    this.IS_NOT_TUTOR = false;
    this.IS_TUTOR = true;
    this.optionsCohorte = [];
    this.optionsState = ['activo', 'graduado', 'inactivo'];
    this.optionsModeEntered = ['maestría', 'doctorado'];
    this.optionsTutor = [];
    this.getAllCohorte();
    this.getTutors();
   }

   ngOnInit() {
    console.log("estudiante a editar desde constructor:  ",this.studenEdit);

    this.fieldsForm = this.formBuilder.group(
      {
        idStudent:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_ID),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                          Validators.pattern('^([0-9])*$'),
                        ]
                    ],
        nameStudent:  ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_NAME),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        Validators.pattern('[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$'),
                        ]
                ],
        surnameStudent:  ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_SURNAME),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        Validators.pattern('[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$'),
                        ]
                      ],
        emailStudent:  ['', [
                        Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_EMAIL),
                        Validators.pattern('^[a-z0-9._%+-]+@unicauca.edu.co$'),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        ]
                      ],
      });

      if (!this.isFormAddStudent) {

        this.fieldsForm.get('idStudent').setValue(this.studenEdit.code);
        this.fieldsForm.get('nameStudent').setValue(this.studenEdit.name);
        this.fieldsForm.get('surnameStudent').setValue(this.studenEdit.surname);
        this.fieldsForm.get('emailStudent').setValue(this.studenEdit.email);
        this.setCohorte();
        this.setState();
        this.setEnteredBy();
      }
  }

   getTutors() {
   this.tutorService.getTutores().subscribe(data => {
        this.proccessResponseTutors(data?.data);
      });


//this.proccessResponseTutors(this.studentService.getAllTutors())

   }

   private proccessResponseTutors(data: Array<any>) {

    this.optionsTutor = data;
         console.log("DATA options:¨ ",this.optionsTutor);
      console.log("Student edit:¨ ",this.studenEdit);

      if (!this.isFormAddStudent) {
      this.setTutor();
      }
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

   clearArray(arrayClear: Array<string>) {
     return arrayClear = [];
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.ressetForm();
    }

    ressetForm() {
      this.form.reset();
    }
    setCohorte() {
      this.optionsCohorte = this.organizateOptions(this.optionsCohorte, this.studenEdit.cohorte, this.IS_NOT_TUTOR);
    }
    setTutor() {
      this.optionsTutor = this.organizateOptions (this.optionsTutor, this.studenEdit.tutor, this.IS_TUTOR);
    }
    setState() {
      this.optionsState = this.organizateOptions(this.optionsState, this.studenEdit.state, this.IS_NOT_TUTOR);
    }
    setEnteredBy() {
      this.optionsModeEntered = this.organizateOptions(this.optionsModeEntered, this.studenEdit.enteredBy, this.IS_NOT_TUTOR);
    }

    organizateOptions(optionsOrganizate: Array<string>, dataSetFirst: any, isTutor: boolean) {
      const optionTypeAux = [];
      if (isTutor) {
        optionTypeAux.push(dataSetFirst);
      } else {
        optionTypeAux.push(dataSetFirst);
      }
      for (let i = 0; i < optionsOrganizate.length; i++) {

        if (isTutor) {
          if (optionsOrganizate[i] !== optionTypeAux[0]) {
            optionTypeAux.push(optionsOrganizate[i]);
          }
        } else {
          if (optionsOrganizate[i] !== optionTypeAux[0]) {
            optionTypeAux.push(optionsOrganizate[i]);
          }
        }
      }
      return optionTypeAux;
    }

    onSubmit() {
      this.getDataStudent();
    }

    getDataStudent() {
      console.log("Data tutor guardada:¨ ", this.cbx_tutorStudent.nativeElement);
      this.getStudent.emit(
                            {
                              id: this.fieldsForm.get('idStudent').value.trim(),
                              name:  this.fieldsForm.get('nameStudent').value.trim(),
                              surname: this.fieldsForm.get('surnameStudent').value.trim(),
                              tutor: this.cbx_tutorStudent.nativeElement.value,
                              email: this.fieldsForm.get('emailStudent').value,
                              cohorte: this.cbx_cohorteStudent.nativeElement.value,
                              state: this.cbx_stateStudent.nativeElement.value,
                              semesterEntered: this.DEFAULT_dATE,
                              enteredBy: this.cbx_enteredByStudent.nativeElement.value
                            }
                          );
    }

}
