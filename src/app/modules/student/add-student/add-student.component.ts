import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {

  /*************************VARIABLES LOCALES**************** */
  titleForm: string;
  titleBtnForm: string;
  subTitleForm: string;
  resetForm:string;
  isFormAddStudent: boolean;
  /*************************VARIABLES DE INSTANCIA************* */
  student: Student;

  constructor()
  {
    this.titleForm = 'Registrar Estudiante';
    this.subTitleForm = 'En este formulario podrá registrar a los estudiantes de maestría';
    this.titleBtnForm = 'Registrar';
    this.resetForm = 'ok';
    this.isFormAddStudent = true;
    this.student = new Student();
  }

  ngOnInit() {
  }

  getDataFormStudent(dateFormAdd: {id: string, name: string, surname: string, tutor: string, email: string,
                                  cohorte: string,state: string, semesterEntered: string, enteredBy: string})
  {
    console.log('llegue a agregar stu: ' + dateFormAdd.tutor);
  }

}
