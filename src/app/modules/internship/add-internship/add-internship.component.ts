import { Component, OnInit } from '@angular/core';
import { Internship } from '../../../models/internship/internship';
import { InternshipService } from '../intership.service.service';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html'
})
export class AddInternshipComponent implements OnInit {

  /******************************VARIABLES LOCALES*********** */
  titleForm: string;
  subTitleForm: string;
  buttonAction: string;
  urlRedirectTo: string;
  paramsRedirectTo: string;
  showProgressRequest: boolean;
  enableRedirectTO: boolean;
  eventt: any;

  constructor(private internshipService: InternshipService)
  {
    this.titleForm = 'Registrar Pasantia';
    this.subTitleForm = 'En este formulario podra registrar sus pasantias';
    this.buttonAction = 'Registrar Pasantia';
    this.urlRedirectTo = '/internship/listInternshipForStudent';
    this.paramsRedirectTo = 'Pasantia Registrada Exitosamente';
    this.showProgressRequest = false;
    this.enableRedirectTO = true;
  }

  ngOnInit() {
  }

  getDataIntership(dataInternship: {internship: Internship})
  {
    this.internshipService.registryInternship(dataInternship.internship)
    .subscribe(event =>
      {
        this.eventt = event;
        this.showProgressRequest = true;

      },err =>
      {
        console.log('no registre pasantia');
      });
  }

}
