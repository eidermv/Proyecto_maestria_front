import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../intership.service.service';
import { Internship } from '../../../models/internship/internship';

@Component({
  selector: 'app-list-internship-for-admin',
  templateUrl: './list-internship-for-admin.component.html'
})
export class ListInternshipForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  optionsInternship: Array<string>;
  showInternship: boolean;
  p: any;
  /****************************VARIABLES DE INSTANCIA*********************/
  internship: Internship;


  constructor(private internshipService: InternshipService)
  {
    this.internship = new Internship();
    this.optionsInternship = [];
  }

  getAllInternshipAdmin()
  {
    this.internshipService.getAllInternshipForAdmin()
    .subscribe(data =>
      {
        this.optionsInternship = data;
      }, err =>
      {

      })
  }

  ngOnInit() {
    this.getAllInternshipAdmin();
  }

  showDataInternship(dataInternship: any)
  {
    this.internship.setIdInternship(dataInternship['id']);
    this.internship.setNameStudent(dataInternship['estudiante']['nombres'] + dataInternship['estudiante']['apellidos']);
    this.internship.setCodeStudent(dataInternship['estudiante']['codigo']);
    this.internship.setDateRegistryIntership(dataInternship['fechaRegistro']);
    this.internship.setDataIntershipStart(dataInternship['fechaInicio']);
    this.internship.setDataIntershipEnd(dataInternship['fechaFin']);
    this.internship.setTypeIntership(dataInternship['tipoPasantia']);
    this.internship.setInstitution(dataInternship['institucion']);
    this.internship.setDependence(dataInternship['dependencia']);
    this.internship.setNameDependence(dataInternship['nombreDependencia']);
    this.internship.setTutorInternship(dataInternship['responsable']);
    this.internship.setState(dataInternship['estado']);
    this.internship.setCredits(dataInternship['creditos']);
    this.internship.setObservation(dataInternship['observacion']);
    this.showInternship = true;
  }
  destroyModal(destruir: {cerrar: boolean})
  {
    this.showInternship = false;
  }


}
