import { Component, OnInit } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html'
})
export class FormStudentComponent implements OnInit {

  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
    this.stringValidation = new StringValidation();
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
        cohorteStudent:  ['',[
                  Validators.maxLength(this.stringValidation.MAX_LONG_COHORTE),
                  Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                  ]
                ],
        surnameStudent:  ['',[
                        Validators.maxLength(this.stringValidation.MAX_LONG_SURNAME),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
        emailStudent:  ['',[
                        Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_EMAIL),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        Validators.pattern('^[a-z0-9._%+-]+@unicauca.edu.co$'),
                        ]
                      ],
      });
  }

  onSubmit()
  {

  }

}
