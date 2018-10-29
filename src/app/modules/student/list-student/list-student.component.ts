import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html'
})
export class ListStudentComponent implements OnInit {

  /*************************VARIABLES LOCALES ************/
  optionsDataStudents: Array<string>;

  constructor( private studentService: StudentService)
  {
    this.optionsDataStudents = [];
    this.getAllStudents();
  }

  getAllStudents()
  {
    this.studentService.getAllStudents()
    .subscribe(data =>
      {
        this.optionsDataStudents = data;
        console.log('estado' + this.optionsDataStudents[0]['codigo']);
      },
      err =>
      {
        console.log('info');
      }
    );
  }

  ngOnInit() {
  }


}
