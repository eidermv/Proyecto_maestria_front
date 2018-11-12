import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { DataSource } from '@angular/cdk/table';
import { Student } from '../../../models/student';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html'
})
export class ListStudentComponent implements OnInit {

  /*************************VARIABLES LOCALES ************/
  @ViewChild('successModal') viewModalOk: any ;
  @ViewChild('warningModal') viewModalMsjOk: any ;
  optionsDataStudents: Array<string>;
  searchTerm: string;
  msjOk: string;

  /************************VARIABLES DE INSTANCIA ********/
  studentShow: Student;



  constructor( private studentService: StudentService, private route: ActivatedRoute,
    private router: Router)
  {
    this.studentShow = new Student();
    this.optionsDataStudents = [];
    this.getAllStudents();
    this.searchTerm = '';


  }

  showMSJ()
  {
    if(this.msjOk != null)
    {
      this.viewModalMsjOk.show();
    }
  }

  getAllStudents()
  {
    this.studentService.getAllStudents()
    .subscribe(data =>
      {
        this.optionsDataStudents = data;
        this.showMSJ();
      },
      err =>
      {
        console.log('info');
      }
    );
  }

  ngOnInit() {
    const msj: string = this.route.snapshot.params['msj'];
    console.log('llegue con el mensaje');
    if(msj != null)
    {
      this.msjOk = msj;
    }
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
    this.router.navigate(['/student/editStudent', aux['codigo']]);
  }

  navigateToAddStudent()
  {
    this.router.navigate(['/student/addStudent']);
  }


}
