import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';

@Component({
  selector: 'app-list-publication-for-student',
  templateUrl: './list-publication-for-student.component.html'
})
export class ListPublicationForStudentComponent implements OnInit {


  /**********************************VARIABLES LOCALES**************** */
  @ViewChild('dangerModal') viewErroServer: any;
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
        this.viewErroServer.show();
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
        this.viewErroServer.show();
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
    this.showModalPublication = false;
  }

  deletePublication(idPublication: string)
  {
    this.publicationsService.deletePublication(idPublication['id'])
    .subscribe(data =>
      {
        this.getAllPublicationsStudent();
      }, err =>
      {
        this.viewErroServer.show();
      });
  }


}
