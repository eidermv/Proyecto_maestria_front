import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';
import { HttpHeaders, HttpHeaderResponse, HttpResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;

  /***************** VARIABLES LOCALES********************** */
  showErrorUser: boolean;
  showErrorPass: boolean;
  showErrorDates: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router)
  {
    this.stringValidation = new StringValidation();
    this.showErrorPass = false;
    this.showErrorUser = false;
    this.showErrorDates = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        userLogin:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_USER),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                    ],
        passLogin:  ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_PASS),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                 ],
      }
    );
  }

  onSubmit()
  {
    let user: string = this.fieldsForm.get('userLogin').value;
    let pass: string = this.fieldsForm.get('passLogin').value;

    if(this.validateField(user, pass))
    {
      this.authService.login(user, pass)
      .subscribe( data =>
        {
          console.log('registre: ' + JSON.stringify(data));
        },
        err =>
        {
        if(err.status == 200)
        {
          this.showErrorDates = false;
          this.showErrorPass = false;
          this.showErrorUser = false;
          this.authService.setSession(err.error.text);
          this.router.navigate(['/student/addStudent']);
        }
        if(err.status == 403)
        {
          this.showErrorDates = true;
        }
        });
    }

  }

  validateField(user: string, pass: string)
  {
    if (user.length == 0)
    {
      this.showErrorUser = true;
    }
    else{
      this.showErrorUser = false;
    }
    if(pass.length == 0)
    {
      this.showErrorPass = true;
    }
    else{
      this.showErrorPass = false;
    }
    if(user.length> 0 && pass.length >0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

 }
