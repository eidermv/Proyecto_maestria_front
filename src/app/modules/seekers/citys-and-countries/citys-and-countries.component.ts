import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SeekersService } from '../seekers.service';
import { StringValidation } from '../../../resources/stringValidation';

@Component({
  selector: 'app-citys-and-countries',
  templateUrl: './citys-and-countries.component.html'
})
export class CitysAndCountriesComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

   /***********************VARIABLES LOCALES *****************/
   @Input() resetForm: {resetForm: string};
   @ViewChild('f') form: NgForm ;
   options = [];
   studentNotFound: boolean;
    fielstudentEmpty: boolean;
    txt_fieldNameStudent: string;
    arrayStudent: Array<string>;
    /****************VARIABLES DE INSTANCIA********** */
    fieldsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private seekersServices: SeekersService)
  {
    this.stringValidation = new StringValidation();
    this.fielstudentEmpty = false;
    this.studentNotFound = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        nameStudent: ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_NAME),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                      ]
                  ]
      });
  }

  ressetForm()
  {
    this.form.reset();
    this.clearOptions();
  }
  clearOptions()
  {
    this.options = [];
  }

  determineAction(eventField: any)
  {
    this.fielstudentEmpty = false;
      if((eventField.key === 'Enter') || (eventField.type === 'click'))
        {
          //this.getDataStudent();
        }
        else {
          this.searchStudent();
        }
  }

  private searchStudent()
  {
    this.txt_fieldNameStudent = this.fieldsForm.get('nameStudent').value;
    if(this.txt_fieldNameStudent.length == 0)
    {
        this.fielstudentEmpty = true;
        this.clearOptions();
    }
    else{
      this.seekersServices.searchCity(this.txt_fieldNameStudent).
      subscribe(data =>
        {
          console.log('pedi');
          this.proccessResponse(data);
        },
        err =>
        {
          console.log('erro');
          this.clearOptions();
          this.fielstudentEmpty = true;
        }
      );
    }
  }
  private proccessResponse(data: Array<any>)
  {
    this.arrayStudent = data;
    if(this.arrayStudent.length > 0)
      {
      this.loadOptions(this.arrayStudent);
      this.studentNotFound = false;
      }
      else
      {
        this.clearOptions();
        this.studentNotFound = true;
      }
  }

  private loadOptions(students: Array<string>)
  {
    this.clearOptions();
    for(let i = 0 ; i < students.length ; i++)
      {
        this.options.push(students[i]['nombres'] + ' ' + students[i]['apellidos']);
      }
  }

}
