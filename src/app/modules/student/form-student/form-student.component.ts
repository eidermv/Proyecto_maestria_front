import { Component, OnInit } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html'
})
export class FormStudentComponent implements OnInit {

  /*************************VARIABLES GLOBALES************* */
  YEAR_END_COHORTE: number;
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /***********************VARIABLES LOCALES***************** */
  optionsCohorte: Array<string>;
  optionsState: Array<string>;
  optionsEnteredSemester: Array<string>;
  optionsModeEntered: Array<string>;

  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
    this.stringValidation = new StringValidation();
    this.YEAR_END_COHORTE = 2000;
    this.optionsCohorte = [];
    this.optionsState = ['Activo', 'Graduado', 'Inactivo'];
    this.optionsEnteredSemester = ['1', '2'];
    this.optionsModeEntered = ['Maestria', 'Doctorado'];
    this.getAllCohorte();
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
  }

  getAllCohorte()
  {// se llena un array con los años desde el 2000 hasta la fecha actual para usarlas en el combo cohorte estudiante
    var date = new Date();
    var dateYear = date.getFullYear();
    this.optionsCohorte = this.clearArray(this.optionsCohorte);
    this.optionsCohorte[0]= ""+dateYear;
    for(let i=1; i <= (dateYear - this.YEAR_END_COHORTE); i++)
    {
      this.optionsCohorte[i] = ""+ (dateYear - i);
    }
  }

  clearArray(arrayClear: Array<string>)
  {
    return arrayClear = [];
  }

}
