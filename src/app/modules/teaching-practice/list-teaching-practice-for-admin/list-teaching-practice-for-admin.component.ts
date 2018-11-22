import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachingPracticeService } from '../teachingPractice.service';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';

@Component({
  selector: 'app-list-teaching-practice-for-admin',
  templateUrl: './list-teaching-practice-for-admin.component.html'
})
export class ListTeachingPracticeForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
   codeStudent: string;
   optionsTeachingPractice: Array<string>;
   showTeachingPractice: boolean;
   p: any;
   /********************************VARIABLES DE INSTANCIA*************/
  teachingPractice: TeachingPractice;

  constructor(private teachingPracticeService: TeachingPracticeService)
  {
    this.teachingPractice = new TeachingPractice();
    this.optionsTeachingPractice = [];
  }

  getAllTeachingPractice()
  {
    this.teachingPracticeService.getAllTeachingPracticeAdmin()
    .subscribe(data =>
      {
        this.optionsTeachingPractice = data;
      }, err =>
      {

      });
  }

  ngOnInit() {
    this.getAllTeachingPractice();
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
    this.showTeachingPractice = true;
  }

  destroyModal(destruir: {cerrar: boolean})
  {
    this.showTeachingPractice = false;
  }


}
