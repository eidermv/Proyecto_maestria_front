import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-publication-for-student',
  templateUrl: './list-publication-for-student.component.html'
})
export class ListPublicationForStudentComponent implements OnInit {


  /**********************************VARIABLES LOCALES**************** */
  @ViewChild('dangerModal') viewErroServer: any;
  @ViewChild('errDeletePublication') viewErrorDeletePublication: any;
  codeStudent: string;
  optionsPublicationsStudent: Array<string>;
  typePublication: string;
  idPublication: string;
  showModalPublication: boolean;
  showModalOk: boolean;
  showEmpty: boolean;
  msjOk: string;
  p: any;
  constructor(private publicationsService: PublicationService, private route: ActivatedRoute,
    private router: Router) {

    this.optionsPublicationsStudent = [];
    this.showModalPublication = false;
    this.showModalOk = false;
    this.showEmpty = false;
    this.idPublication = '';
    this.typePublication = '';
  }
  getDateStudent() {
    this.publicationsService.getStudent()
    .subscribe(data => {
        this.codeStudent = data['codigo'];
        this.getAllPublicationsStudent();
      }, err => {
        this.viewErroServer.show();
      });
  }

  getAllPublicationsStudent() {
    this.publicationsService.getPublicationStudent(this.codeStudent)
    .subscribe(data => {
         this.optionsPublicationsStudent = data;
         if (this.optionsPublicationsStudent.length === 0) {
          this.showEmpty = true;
         } else {
           this.showEmpty = false;
         }

      }, err => {
        this.viewErroServer.show();
      });
  }

  ngOnInit() {
    const msj: string = this.route.snapshot.params['msj'];
    if (msj != null) {
      this.msjOk = msj;
      this.showModalOk = true;
    }
    this.getDateStudent();
  }

  showPublication(aux: any) {
    this.typePublication =  aux['tipoDocumento'];
    this.idPublication = aux['id'];
    this.showModalPublication = true;
  }

  destroyModal(destruir: {cerrar: boolean}) {
    this.showModalPublication = false;
  }

  deletePublication(publication) {
    if (publication['estado'] === 'Por verificar') {
      this.publicationsService.deletePublication(publication['id'])
    .subscribe(data => {
        this.getAllPublicationsStudent();
      }, err => {
        this.viewErroServer.show();
      });
    } else {
      this.viewErrorDeletePublication.show();
    }
  }


}
