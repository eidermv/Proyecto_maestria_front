import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../../models/student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {

  /*************************VARIABLES LOCALES**************** */
  @ViewChild('successModal') viewModalOk: any ;
  @ViewChild('dangerModal') viewModalFail: any ;
  @ViewChild('progressModal') viewProgressRequest: any;
  titleForm: string;
  titleBtnForm: string;
  subTitleForm: string;
  resetForm:string;
  isFormAddStudent: boolean;
  textErrorService: string;
  progressRequest: string;
  titleModalSucces: string;
  subtitleModalSucces: string;
  titleModalError: string;
  subtitleModaErro: string;
  /*************************VARIABLES DE INSTANCIA************* */
  student: Student;

  constructor( private studentService: StudentService, private router: Router)
  {
    this.titleForm = 'Registrar Estudiante';
    this.subTitleForm = 'En este formulario podrá registrar a los estudiantes de maestría. Los campos con * son obligatorios';
    this.titleBtnForm = 'Registrar';
    this.resetForm = 'ok';
    this.progressRequest = '0%';
    this.isFormAddStudent = true;
    this.student = new Student();
    this.textErrorService = '';
  }

  ngOnInit() {
  }

  getDataFormStudent(dateFormAdd: {id: string, name: string, surname: string, tutor: string, email: string,
                                  cohorte: string,state: string, semesterEntered: string, enteredBy: string})
  {
    this.student.setId(dateFormAdd.id);
    this.student.setName(dateFormAdd.name);
    this.student.setSurname(dateFormAdd.surname);
    this.student.setTutor(dateFormAdd.tutor);
    this.student.setEmail(dateFormAdd.email);
    this.student.setEnteredSemester(dateFormAdd.semesterEntered);
    this.student.setEnteredBy(dateFormAdd.enteredBy);
    this.student.setCohorte(dateFormAdd.cohorte);
    this.student.setState(dateFormAdd.state);
    this.studentService.createStudent(this.student)
    .subscribe(event =>
      {
        this.proccesResponseRegistryStudentOk(event, 'Estudiante registrado con exito' , 'El estudiante ya puede utilizar el sistema');
      },
      err =>
      {
        this.viewProgressRequest.hide();
        if(err.error['error'] == '102' && err.error['campo'] == '100')
        {
          this.textErrorService = 'La identificación digitada ya existe en el sistema';
        }
        if(err.error['error'] == '102' && err.error['campo'] == '103')
        {
          this.textErrorService = 'El correo digitado ya existe en el sistema';
        }
        this.showModalFail();
      });
  }


  private showModalOk()
  {
      this.viewModalOk.show();
      this.resetForm = this.resetForm + 'ok';
      this.redirectToListStudent();
  }

  private showModalFail()
  {
    this.viewModalFail.show();
  }

  proccesResponseRegistryStudentOk(event: any, msjOK: string, msjSubOk: string)
  {
        if(event.type === HttpEventType.UploadProgress)
        {
          this.showModalProgressRequest();
          this.progressRequest = (Math.round(event.loaded / event.total * 100 ) -1 )+ '%';
        }
        else{
          if(event.type === HttpEventType.Response)
          {
            this.viewProgressRequest.hide();
            this.showModalOk();
            this.redirectToListStudent();
          }
        }
  }

  showModalProgressRequest()
  {
    this.viewProgressRequest.show();
  }


  redirectToListStudent()
  {
    this.router.navigate(['/student/listStudent', 'Estudiante Registrado exitosamente']);
  }



}
