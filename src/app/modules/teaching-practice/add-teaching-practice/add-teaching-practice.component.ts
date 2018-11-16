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
  constructor(private teachingPracticeService: TeachingPracticeService) { }

  ngOnInit() {
    this.titleForm = 'Registrar Practica Docente';
    this.subTitleForm = 'En este formulario podra registrar sus practicas docentes';
    this.buttonAction = 'Registrar Practica Docente';
    this.progressRequest = '';
    this.showProgressRequest = false;
  }

  getDataTeachingPractice(dataTeachingPractice: {teachingPractice: TeachingPractice})
  {
    this.teachingPracticeService.registryTeachingPractice(dataTeachingPractice.teachingPractice)
    .subscribe(event =>
      {
        this.proccesResponseRegistryPublicationOk(event);
      }, errr =>
      {
        this.showModalFail();
      });
  }

  proccesResponseRegistryPublicationOk(event: any)
  {
    this.showProgressRequest= true;
        if(event.type === HttpEventType.UploadProgress)
        {
          this.showModalProgressRequest();
          this.progressRequest = (Math.round(event.loaded / event.total * 100 ) -1 )+ '%';
        }
        else{
          if(event.type === HttpEventType.Response)
          {
            this.showProgressRequest = false;
            this.viewProgressRequest.hide();
            this.showProgressRequest = false;
            this.redirectToListTeachingPractice();
          }
        }
  }

  showModalProgressRequest()
  {
    this.showProgressRequest= true;
    this.viewProgressRequest.show();
  }
  showModalFail()
  {
    this.showProgressRequest = false;
    this.viewModalFail.show();
  }

  redirectToListTeachingPractice()
  {
    this.showProgressRequest = false;
    console.log('registre exitoso');
  }

}
