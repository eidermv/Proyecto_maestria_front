import { Component, OnInit, ViewChild } from '@angular/core';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';
import {HttpEventType} from '@angular/common/http';
import { TeachingPracticeService } from '../teachingPractice.service';

@Component({
  selector: 'app-add-teaching-practice',
  templateUrl: './add-teaching-practice.component.html'
})
export class AddTeachingPracticeComponent implements OnInit {

  /******************************VARIABLES LOCALES************** */
  @ViewChild('progressModal') viewProgressRequest: any;
  @ViewChild('dangerModal') viewModalFail: any ;
  titleForm: string;
  subTitleForm: string;
  buttonAction: string;
  urlRedirecTo: string;
  paramsRedirectTo: string;
  showProgressRequest: boolean;
  enableRedirect: boolean;
  progressRequest: string;
  eveent: any;


  constructor(private teachingPracticeService: TeachingPracticeService)
  {
    this.titleForm = 'Registrar Práctica Docente';
    this.subTitleForm = 'En este formulario podra registrar sus actividades de práctica docente';
    this.buttonAction = 'Registrar Practica Docente';
    this.urlRedirecTo = './teachingPractice/listTeachingPracticeforStudent';
    this.paramsRedirectTo = 'Práctica Docente Registrada Exitosamente';
    this.progressRequest = '';
    this.showProgressRequest = false;
    this.enableRedirect = true;
  }

  ngOnInit() {

  }

  getDataTeachingPractice(dataTeachingPractice: {teachingPractice: TeachingPractice})
  {

    this.teachingPracticeService.registryTeachingPractice(dataTeachingPractice.teachingPractice)
    .subscribe(event =>
      {
        this.eveent = event;
        this.showProgressRequest = true;
      }, errr =>
      {
        this.showModalFail();
      });
  }

  showModalFail()
  {
    this.showProgressRequest = false;
    this.viewModalFail.show();
  }
}
