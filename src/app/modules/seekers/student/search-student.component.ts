import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeekersService } from '../seekers.service';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './search-student.component.html'
})
export class SearchStudentComponent implements OnInit {
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;
    /***********************VARIABLES LOCALES *****************/
    @Output() getStudent = new EventEmitter<{id: string, name: string, surname: string, tutor: string, email: string,
                                          cohorte: string, state: string, semesterEntered: string, enteredBy: string}>();
    @Input() resetForm: {resetForm: string};
    @ViewChild('f') form: NgForm ;
    options = [];
    studentNotFound: boolean;
    fielstudentEmpty: boolean;
    txt_fieldNameStudent: string;
    arrayStudent: Array<string>;
    /****************VARIABLES DE INSTANCIA********** */
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
          this.getDataStudent();
        }
        else {
          this.searchStudent();
        }
  }

  private searchStudent()
  {
    this.txt_fieldNameStudent = this.fieldsForm.get('nameStudent').value;
    /*this.seekersServices.searchTheard(this.txt_fieldNameThird).
    subscribe(data =>
      {
        this.proccessResponse(data);
      },
      err =>
      {
        this.clearOptions();
        this.fieldTrhidEmpty = true;
      }

    );*/
  }
  private proccessResponse(data: JSON)
  {
    this.arrayStudent = data['data'].thirdParties;
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
        this.options.push(students[i]['name']);
      }
  }

  getDataStudent()
  {
    if(this.checkSelectedStudentValid())
      {
      this.selectedStudent();
      this.getStudent.emit(
                            /*{
                              id: this.fieldsForm.get('idStudent').value,
                              name:  this.fieldsForm.get('nameStudent').value,
                              surname: this.fieldsForm.get('surnameStudent').value,
                              tutor: this.cbx_tutorStudent.nativeElement.value,
                              email: this.fieldsForm.get('emailStudent').value,
                              cohorte: this.cbx_cohorteStudent.nativeElement.value,
                              state: this.cbx_stateStudent.nativeElement.value,
                              semesterEntered: this.cbx_semesterStudent.nativeElement.value,
                              enteredBy: this.cbx_enteredByStudent.nativeElement.value
                            }*/
                          );
      }
  }
  checkSelectedStudentValid()
  {
    return this.options.includes(this.fieldsForm.get('nameStudent').value.trim());
  }

  selectedStudent()
  {
    {
      for(let i = 0; i < this.arrayStudent.length ; i++)
      {
        if(this.arrayStudent[i]['name'].includes(this.fieldsForm.get('nameStudent').value.trim()) )
        {
          this.student.setId(this.arrayStudent[i]);
        }
      }
    }
  }

}
