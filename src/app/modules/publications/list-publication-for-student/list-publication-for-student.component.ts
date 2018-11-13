import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publications.service';

@Component({
  selector: 'app-list-publication-for-student',
  templateUrl: './list-publication-for-student.component.html'
})
export class ListPublicationForStudentComponent implements OnInit {


  /**********************************VARIABLES LOCALES**************** */
  codeStudent: string;
  optionsPublicationsStudent: Array<string>;
  typePublication: string;
  idPublication: string;
  showModalPublication: boolean;

  constructor(private publicationsService: PublicationService)
  {
    this.getDateStudent();
    this.optionsPublicationsStudent = [];
    this.showModalPublication = false;
    this.idPublication = '';
    this.typePublication = '';
  }

  ngOnInit() {
  }

  getDateStudent()
  {
    this.publicationsService.getStudent()
    .subscribe(data =>
      {
        this.codeStudent = data['codigo'];
        this.getAllPublicationsStudent();
      },err =>
      {
      });
  }

  getAllPublicationsStudent()
  {
    this.publicationsService.getPublicationStudent(this.codeStudent)
    .subscribe(data =>
      {
         this.optionsPublicationsStudent = data;
      },err =>
      {
        console.log(err);
      });
  }

  showPublication(aux: any)
  {
    this.typePublication =  aux['tipoDocumento'];
    this.idPublication = aux['id'];
    this.showModalPublication = true;
  }

  destroyModal(destruir: {cerrar: boolean})
  {
    console.log('llgue a desturi');
    this.showModalPublication = false;
  }

  deletePublication(idPublication: string)
  {
    this.publicationsService.deletePublication(idPublication['id'])
    .subscribe(data =>
      {
        console.log('elimine');
        this.getAllPublicationsStudent();
      }, err =>
      {
        console.log('no elimine');
      });
  }


}
