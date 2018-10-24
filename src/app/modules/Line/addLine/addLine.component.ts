import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {StringApp} from '../../../resources/stringApp';
import {FormControl,FormGroup , FormBuilder, Validators, NgForm} from '@angular/forms';
import { LineService } from '../line.service';
import { Line } from '../../../models/line';
import {HttpEvent, HttpResponse, HttpHeaderResponse} from '@angular/common/http';
import { error } from 'protractor';
import { StringValidation } from '../../../resources/stringValidation';
@Component({
  selector: 'app-add-line',
  templateUrl: './addLine.component.html',
  providers: [LineService, Line]
})
export class AddLineComponent implements OnInit {

  /*************************STRINGS APP********************* */
  stringApp: StringApp = new StringApp();
  stringValidation: StringValidation = new StringValidation();

  /************************ VARIABLES LOCALES************** */
  nameLine: String;

  /************************VARIABLES DE INSTANCIA********** */
  line: Line;
  fieldsForm: FormGroup;

  /***********************ACCESO AL FORMULARIO************* */
  @ViewChild('successModal') viewModalOk: any ;
  @ViewChild('dangerModal') viewModalFail: any ;
  @ViewChild('f') form: NgForm ;

  constructor(private formBuilder: FormBuilder , private lineService: LineService) {
   }


  ngOnInit() {
    // se inician los campos y se agregan las validaciones
    this.fieldsForm = this.formBuilder.group(
      {
        nameLine: ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_NAME_LINE),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                      ]
                  ]
      }
    );

  }

  onSubmit()
  {
    this.line = new Line();
    this.line.setDescription(this.fieldsForm.get('nameLine').value);
    this.lineService.addLineService(this.line)
    .subscribe(data =>
      {
        this.showModalOk();
      },
      err =>
      {
        this.showModalFail();
      }
    );
  }

  private showModalOk()
  {
      this.viewModalOk.show();
      this.resetForm();
  }

  private showModalFail()
  {
    this.viewModalFail.show();
  }

  private resetForm()
  {
    this.form.reset();
  }
}
