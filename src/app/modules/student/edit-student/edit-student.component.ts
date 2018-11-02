import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {


  /*************************VARIABLES LOCALES**************** */
  @ViewChild('successModal') viewModalOk: any ;
  @ViewChild('dangerModal') viewModalFail: any ;
  @ViewChild('warningModal') viewModalWarning: any;
  titleForm: string;
  titleBtnForm: string;
  subTitleForm: string;
  resetForm:string;
  isFormAddStudent: boolean;
  showFormEdit: boolean;
  textErrorService: string;
  studentEdit: {code: string, name: string, surname: string, tutor: string, email: string,
                cohorte: string,state: string, semesterEntered: string, enteredBy: string};
  studentOldEdit:{code: string, id: string, name: string, surname: string, tutor: string, email: string,
                  cohorte: string,state: string, semesterEntered: string, enteredBy: string};

   /*************************VARIABLES DE INSTANCIA************* */
   student: Student;

  constructor(private studentService: StudentService, private route: ActivatedRoute,
              private router: Router)
              {
                this.titleForm = 'Editar Estudiante';
                this.subTitleForm = 'En este formulario podrá Editar a los estudiantes de maestría';
                this.titleBtnForm = 'Editar';
                this.resetForm = 'ok';
                this.isFormAddStudent = false;
                this.showFormEdit = false;
                this.textErrorService = '';
                this.student = new Student();
               }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if(id != null)
    {
      this.getStudentToEdit(id);
    }
  }

  getStudentToEdit(id: string)
  {
    this.studentService.getStudentByCode(id)
    .subscribe(data =>
      {
        this.proccessResponseStudent(data);
      },
      err =>
      {

      });
  }

  proccessResponseStudent(dateStudentEdit: Array<string>)
  {
    this.studentEdit = {
                          code: dateStudentEdit['codigo'],
                          name: dateStudentEdit ['nombres'],
                          surname: dateStudentEdit['apellidos'],
                          tutor: dateStudentEdit['tutor']['nombre'],
                          email: dateStudentEdit['correo'],
                          cohorte: dateStudentEdit['cohorte'],
                          state: dateStudentEdit['estado'],
                          semesterEntered: dateStudentEdit['semestre'],
                          enteredBy: dateStudentEdit['pertenece'],
                      };
    this.studentOldEdit =
                      {
                        id: dateStudentEdit['id'],
                        code: dateStudentEdit['codigo'],
                        name: dateStudentEdit ['nombres'],
                        surname: dateStudentEdit['apellidos'],
                        tutor: dateStudentEdit['tutor']['nombre'],
                        email: dateStudentEdit['correo'],
                        cohorte: dateStudentEdit['cohorte'],
                        state: dateStudentEdit['estado'],
                        semesterEntered: dateStudentEdit['semestre'],
                        enteredBy: dateStudentEdit['pertenece']
                      };
   this.showFormEdit = true;
  }

  getDataFormStudent(dateFormEdit: {id: string, name: string, surname: string, tutor: string, email: string,
    cohorte: string,state: string, semesterEntered: string, enteredBy: string})
    {

      if(this.verifyChangesOnEdit(dateFormEdit))
      {
        this.student.setId(this.studentOldEdit.id);
        this.student.setCodigo(dateFormEdit.id);
        this.student.setName(dateFormEdit.name);
        this.student.setSurname(dateFormEdit.surname);
        this.student.setTutor(dateFormEdit.tutor);
        this.student.setEmail(dateFormEdit.email);
        this.student.setEnteredSemester(dateFormEdit.semesterEntered);
        this.student.setEnteredBy(dateFormEdit.enteredBy);
        this.student.setCohorte(dateFormEdit.cohorte);
        this.student.setState(dateFormEdit.state);

        this.studentService.updateStudent(this.student)
        .subscribe(data =>
          {
            this.showModalOk();
          },
          err =>
          {
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

      }else{
        this.showModalWarnin();
      }
    }

  verifyChangesOnEdit(newDateStudent: any)
  {
    console.log();
    if(this.studentOldEdit.code == newDateStudent.id && this.studentOldEdit.name == newDateStudent.name &&
      this.studentOldEdit.surname == newDateStudent.surname && this.studentOldEdit.tutor == newDateStudent.tutor &&
      this.studentOldEdit.email == newDateStudent.email && this.studentOldEdit.cohorte == newDateStudent.cohorte &&
      this.studentOldEdit.cohorte == newDateStudent.cohorte && this.studentOldEdit.enteredBy == newDateStudent.enteredBy &&
      this.studentOldEdit.state == newDateStudent.state
      )
    {
     return false;
    }
    else{
      return true;
    }
  }

  private showModalOk()
  {
      this.viewModalOk.show();
      this.resetForm = this.resetForm + 'ok';
  }

  private showModalFail()
  {
    this.viewModalFail.show();
  }

  private showModalWarnin()
  {
    this.viewModalWarning.show();
  }

  redirectToListStudent()
  {
    this.router.navigate(['/student/listStudent']);
  }



}
