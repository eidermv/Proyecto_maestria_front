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

  constructor(private internshipService: InternshipService)
  {
    this.titleForm = 'Registrar Pasantia';
    this.subTitleForm = 'En este formulario podra registrar sus pasantias';
    this.buttonAction = 'Registrar Pasantia';
  }

  ngOnInit() {
  }

  getDataIntership(dataInternship: {internship: Internship})
  {
    this.internshipService.registryInternship(dataInternship.internship)
    .subscribe(data =>
      {
        console.log('si registra pasantia');
      },err =>
      {
        console.log('no registre pasantia');
      });
  }

}
