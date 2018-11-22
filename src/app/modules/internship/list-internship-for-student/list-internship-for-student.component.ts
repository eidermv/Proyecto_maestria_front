import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipService } from '../intership.service.service';
import { Internship } from '../../../models/internship/internship';

@Component({
  selector: 'app-list-internship-for-student',
  templateUrl: './list-internship-for-student.component.html'
})
export class ListInternshipForStudentComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  codeStudent: string;
  optionsInternship: Array<string>;
  showInternship: boolean;
  showModalOk: boolean;
  msjOk: string;
  showFail: boolean;
  msjFail: string;

  /****************************VARIABLES DE INSTANCIA*********************/
  internship: Internship;

  constructor(private internshipService: InternshipService,private route: ActivatedRoute,private router: Router)
  {
    this.internship = new Internship();
    this.optionsInternship = [];
    this.showInternship = false;
    this.showModalOk = false;
    this.showFail = false;
  }


  getAllInternship()
  {
    this.internshipService.getAllInternshipForStudent(this.codeStudent)
    .subscribe(data=>
      {
        this.optionsInternship = data;
      }, err =>
      {
        this.msjFail = 'Error al obtener mis pasantias';
        this.showFail = true;
      });
  }

  ngOnInit() {
    const msj: string = this.route.snapshot.params['msj'];
    if(msj != null)
    {
      this.msjOk = msj;
      this.showModalOk = true;
    }
   this.getAllInternship();
  }

  showDataInternship(dataInternship: any)
  {
    this.internship.setIdInternship(dataInternship['id']);
    this.internship.setNameStudent(dataInternship['estudiante']['nombres'] + dataInternship['estudiante']['apellidos']);
    this.internship.setCodeStudent(dataInternship['estudiante'['codigigo']]);
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

  deleteInternship(idInternship: string)
  {
    this.internshipService.deleteInternship(idInternship)
    .subscribe(data =>
      {
        this.getAllInternship();
      },err =>
      {
        this.msjFail ='Error al eliminar la pasantia';
        this.showFail = true;
      });
  }

}
