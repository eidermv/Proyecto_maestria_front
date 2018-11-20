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
  showProgressRequest: boolean;
  progressRequest: string;
  eveent: any;
  urlRedirecTo: string;
  paramsRedirectTo: string;
  constructor(private teachingPracticeService: TeachingPracticeService)
  {
    this.titleForm = 'Registrar Practica Docente';
    this.subTitleForm = 'En este formulario podra registrar sus practicas docentes';
    this.buttonAction = 'Registrar Practica Docente';
    this.urlRedirecTo = './teachinPractice/nn';
    this.paramsRedirectTo = 'Registro Exitoso';
    this.progressRequest = '';
    this.showProgressRequest = false;
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
