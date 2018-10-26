import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService)
  {
    this.stringValidation = new StringValidation();
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        userLogin:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_USER),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                    ],
        passLogin:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_PASS),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                 ],
      }
    );
  }

  onSubmit()
  {

  }

 }
