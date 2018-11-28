import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeekersService } from '../seekers.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-search',
  templateUrl: './search-student.component.html'
})
export class SearchStudentComponent implements OnInit {
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;
    /***********************VARIABLES LOCALES *****************/

    @ViewChild('f') form: NgForm ;
    options = [];
    studentNotFound: boolean;
    fielstudentEmpty: boolean;
    txt_fieldNameStudent: string;
    arrayStudent: Array<string>;
    /****************VARIABLES DE INSTANCIA********** */
    @Output() getStudent = new EventEmitter<{student: Student}>();
    fieldsForm: FormGroup;
    student: Student;

  constructor(private formBuilder: FormBuilder, private seekersServices: SeekersService)
  {
    this.stringValidation = new StringValidation();
    this.fielstudentEmpty = false;
    this.studentNotFound = false;
    this.student = new Student();
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

  clearOptions()
  {
    this.options = [];
  }

  determineAction(eventField: any, dataStudent: any)
  {

    this.fielstudentEmpty = false;
      if((eventField.key === 'Enter') || (eventField.type === 'click'))
        {
          this.getDataStudent(dataStudent);
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
      this.seekersServices.searchStudent(this.txt_fieldNameStudent).
      subscribe(data =>
        {
          this.proccessResponse(data);
        },
        err =>
        {
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
      this.loadOptions();
      this.studentNotFound = false;
      }
      else
      {
        this.clearOptions();
        this.studentNotFound = true;
      }
  }

  private loadOptions()
  {
    this.clearOptions();
    for(let i = 0 ; i < this.arrayStudent.length ; i++)
      {
        this.options.push(this.arrayStudent[i]);
      }
  }

  getDataStudent(dataStudent: any)
  {
    this.fieldsForm.get('nameStudent').setValue(dataStudent['nombres'] + ' ' + dataStudent['apellidos']);
    if(this.checkSelectedStudentValid())
      {
      this.student.setCodigo(dataStudent['codigo']);
      this.student.setName(dataStudent['nombres']);
      this.student.setSurname(dataStudent['apellidos']);
      this.student.setEmail(dataStudent['correo']);
      this.student.setCohorte(dataStudent['cohorte']);
      this.student.setState(dataStudent['estado']);
      this.student.setEnteredBy(dataStudent['pertenece']);
      this.student.setTutor(dataStudent['tutor']['nombre']);
      this.getStudent.emit({student : this.student});
      }
      else
      {
        this.studentNotFound = true;
      }
  }

  checkSelectedStudentValid()
  {
    var aux = this.fieldsForm.get('nameStudent').value;
    for(let i = 0; i < this.options.length; i ++)
    {
      if( aux === (this.options[i]['nombres'] + ' ' + this.options[i]['apellidos']))
      {
        return true;
      }
   }
   return false;
  }


}
