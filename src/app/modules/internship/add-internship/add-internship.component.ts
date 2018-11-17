import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html'
})
export class AddInternshipComponent implements OnInit {

  /******************************VARIABLES LOCALES*********** */
  titleForm: string;
  subTitleForm: string;
  buttonAction: string;

  constructor() 
  {
    this.titleForm = 'Registrar Pasantia';
    this.subTitleForm = 'En este formulario podra registrar sus pasantias';
    this.buttonAction = 'Registrar Pasantia';
  }

  ngOnInit() {
  }

}
