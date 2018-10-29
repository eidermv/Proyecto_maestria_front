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
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /***********************VARIABLES LOCALES***************** */
  @Input() studenEdit: {id: string, name: string, surname: string, tutor: string, email: string, cohorte: string,
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
  optionsTutor: Array<string>;

  /************************VARIABLES DE INSTANCIA********** */
  @Output() getStudent = new EventEmitter<{id: string, name: string, surname: string, tutor: string, email: string, cohorte: string,
                                          state: string, semesterEntered: string, enteredBy: string}>();
  fieldsForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
    this.stringValidation = new StringValidation();
    this.YEAR_END_COHORTE = 2000;
    this.optionsCohorte = [];
    this.optionsState = ['Activo', 'Graduado', 'Inactivo'];
    this.optionsEnteredSemester = ['1', '2'];
    this.optionsModeEntered = ['Maestría', 'Doctorado'];
    this.optionsTutor = [];
    this.getAllCohorte();
    this.getTutors();
   }

   getTutors()
   {
     this.studentService.getAllTutors()
     .subscribe(data =>
      {
        this.proccessResponseTutors(data);
      });
   }

   private proccessResponseTutors(data: Array<any>)
  {
    this.optionsTutor = data;
  }


   getAllCohorte()
   {// se llena un array con los años desde el 2000 hasta la fecha actual para usarlas en el combo cohorte estudiante
     var date = new Date();
     var dateYear = date.getFullYear();
     this.optionsCohorte = this.clearArray(this.optionsCohorte);
     this.optionsCohorte[0]= ""+dateYear;
     for(let i= 1; i <= (dateYear - this.YEAR_END_COHORTE); i++)
     {
       this.optionsCohorte[i] = "" + (dateYear - i);
     }
   }

   clearArray(arrayClear: Array<string>)
   {
     return arrayClear = [];
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.ressetForm();
    }

    ressetForm()
    {
      this.form.reset();
    }

    ngOnInit() {
      this.fieldsForm = this.formBuilder.group(
        {
          idStudent:    ['', [Validators.required,
                            Validators.maxLength(this.stringValidation.MAX_LONG_ID),
                            Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                          ]
                      ],
          nameStudent:  ['',[Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_NAME),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                          ]
                  ],
          surnameStudent:  ['',[Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_SURNAME),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                          ]
                        ],
          emailStudent:  ['',[
                          Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_EMAIL),
                          Validators.pattern('^[a-z0-9._%+-]+@unicauca.edu.co$'),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                          ]
                        ],
        });
    }

    onSubmit()
    {
      this.getDataStudent();
    }

    getDataStudent()
    {
      this.getStudent.emit(
                            {
                              id: this.fieldsForm.get('idStudent').value,
                              name:  this.fieldsForm.get('nameStudent').value,
                              surname: this.fieldsForm.get('surnameStudent').value,
                              tutor: this.cbx_tutorStudent.nativeElement.value,
                              email: this.fieldsForm.get('emailStudent').value,
                              cohorte: this.cbx_cohorteStudent.nativeElement.value,
                              state: this.cbx_stateStudent.nativeElement.value,
                              semesterEntered: this.cbx_semesterStudent.nativeElement.value,
                              enteredBy: this.cbx_enteredByStudent.nativeElement.value
                            }
                          );
    }



}
