import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { DataSource } from '@angular/cdk/table';
import { Student } from '../../../models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html'
})
export class ListStudentComponent implements OnInit {

  /*************************VARIABLES LOCALES ************/
  @ViewChild('successModal') viewModalOk: any ;
  optionsDataStudents: Array<string>;

  /************************VARIABLES DE INSTANCIA ********/
  studentShow: Student;



  constructor( private studentService: StudentService, private route: Router)
  {
    this.studentShow = new Student();
    this.optionsDataStudents = [];
    this.getAllStudents();
  }

  getAllStudents()
  {
    this.studentService.getAllStudents()
    .subscribe(data =>
      {
        this.optionsDataStudents = data;
      },
      err =>
      {
        console.log('info');
      }
    );
  }

  ngOnInit() {
  }

  showModalOk(aux: any)
  {
    this.studentShow.setId(aux['codigo']);
    this.studentShow.setName(aux['nombres']);
    this.studentShow.setSurname(aux['apellidos']);
    this.studentShow.setTutor(aux['tutor']['nombre']);
    this.studentShow.setEmail(aux['correo']);
    this.studentShow.setCohorte(aux['cohorte']);
    this.studentShow.setEnteredSemester(aux['semestre']);
    this.studentShow.setEnteredBy(aux['pertenece']);
    this.studentShow.setState(aux['estado']);
    this.viewModalOk.show();
  }

  sendInfoToEditStudentComponent(aux: any)
  {
    this.route.navigate(['/student/editStudent', aux['nombres']]);
  }


}
