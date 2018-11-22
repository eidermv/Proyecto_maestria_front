import { Component, OnInit } from '@angular/core';
import { TeachingPracticeService } from '../teachingPractice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';

@Component({
  selector: 'app-list-teaching-practice-for-student',
  templateUrl: './list-teaching-practice-for-student.component.html'
})
export class ListTeachingPracticeForStudentComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  codeStudent: string;
  optionsTeachingPractice: Array<string>;
  showTeachingPractice: boolean;
  showModalOk: boolean;
  msjOk: string;
  showFail: boolean;
  msjFail: string;
  p: any;
  /********************************VARIABLES DE INSTANCIA*************/
  teachingPractice: TeachingPractice;

  constructor(private teachingPracticeService: TeachingPracticeService,
              private route: ActivatedRoute,private router: Router)
  {
    this.teachingPractice = new TeachingPractice();
    this.optionsTeachingPractice = [];
    this.showTeachingPractice = false;
    this.showModalOk = false;
    this.showFail = false;
  }

  getDateStudent()
  {
   this.teachingPracticeService.getStudent()
   .subscribe(data =>
    {
      this.codeStudent = data['codigo'];
      this.getAllTeachingPractice();
    },err =>
    {
      this.msjFail = 'Error al obtener informacion del estudiante';
      this.showFail = true;
    });
  }

  getAllTeachingPractice()
  {
    this.teachingPracticeService.getAllTeachingPractice(this.codeStudent)
    .subscribe(data =>
      {
        this.optionsTeachingPractice = data;
      }, err =>
      {
        this.msjFail = 'Error al obtener mis practicas docente';
        this.showFail = false;
      });
  }

  ngOnInit() {
    const msj: string = this.route.snapshot.params['msj'];
    if(msj != null)
    {
      this.msjOk = msj;
      this.showModalOk = true;
    }
    this.getDateStudent();
  }

  showDataTeachingPractice(teachigP: any)
  {
    this.teachingPractice.setTypePractice(teachigP['tipoPracticaDocente']);
    this.teachingPractice.setDateRegister(teachigP['fechaRegistro']);
    this.teachingPractice.setDateStart(teachigP['fechaInicio']);
    this.teachingPractice.setDateEnd(teachigP['fechaFin']);
    this.teachingPractice.setState(teachigP['estado']);
    this.teachingPractice.setHours(teachigP['horas']);
    this.teachingPractice.setObservation(teachigP['observaciones']);
    this.teachingPractice.setIdPractice(teachigP['id']);
    this.teachingPractice.setNameStudent(teachigP['estudiante']['nombres'] +' ' + teachigP['estudiante']['apellidos']);
    this.teachingPractice.setCodeStudent(this.codeStudent);
    this.teachingPractice.setObservation(teachigP['observacion']);
    this.showTeachingPractice = true;
  }

  destroyModal(destruir: {cerrar: boolean})
  {
    this.showTeachingPractice = false;
  }

  deleteTeachingPractice(idTeachingPractice: string)
  {
    this.teachingPracticeService.deleteTeachingPractice(idTeachingPractice)
   .subscribe(data =>
     {
        this.getAllTeachingPractice();
     },err =>
     {
        this.msjFail = 'Error al eliminar la practica docente';
        this.showFail = true;
     }
   );
  }

}
