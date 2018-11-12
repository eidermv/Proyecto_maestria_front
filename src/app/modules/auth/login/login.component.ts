import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';
import { HttpHeaders, HttpHeaderResponse, HttpResponse, HttpEventType, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { StringApp } from '../../../resources/stringApp';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;
  stringApp: StringApp;

  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;

  /***************** VARIABLES LOCALES********************** */
  showErrorUser: boolean;
  showErrorPass: boolean;
  showErrorDates: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router)
  {
    this.stringValidation = new StringValidation();
    this.stringApp = new StringApp();
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
          this.showErrorDates = false;
          this.showErrorPass = false;
          this.showErrorUser = false;
          this.authService.setSession(data);
          if(sessionStorage.getItem('rol') == this.stringApp.COORDINATOR)
          {
            this.router.navigate(['/student/listStudent']);
          }
          else if(sessionStorage.getItem('rol') == this.stringApp.STUDENT)
          {

            this.router.navigate(['/publication/addPublications']);
          }
          else{
            this.router.navigate(['/login']);
          }
        },
        err =>
        {
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
