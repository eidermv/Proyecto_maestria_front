import { Component, OnInit, ViewChild } from '@angular/core';
import { InternshipService } from '../intership.service.service';
import { Internship } from '../../../models/internship/internship';
/***************************VARIABLES GLOBALES******** */
const APROBADA: string = 'Aprobado';
const REPROBADA: string = 'Rechazado';
const POR_VERIFICAR: string = 'Por verificar';

@Component({
  selector: 'app-list-internship-for-admin',
  templateUrl: './list-internship-for-admin.component.html'
})
export class ListInternshipForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  @ViewChild('showEditState') viewEditState: any ;
  optionsInternship: Array<string>;
  optionsCredits: Array<string>;
  optionState: Array<string>;
  showInternship: boolean;
  showCredits: boolean;
  comentary: string;
  nameStudent: string;
  codeStudent: string;
  selectedState: string;
  totalCredits: string;
  idInternship: string;
  p: any;
  /****************************VARIABLES DE INSTANCIA*********************/
  internship: Internship;


  constructor(private internshipService: InternshipService)
  {
    this.internship = new Internship();
    this.optionState = [POR_VERIFICAR, APROBADA, REPROBADA];
    this.optionsCredits = ['1', '2', '3', '4', '5', '6'];
    this.optionsInternship = [];
    this.showCredits = false;
    this.showInternship = false;
    this.totalCredits = '0';
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

  handleState(event: any)
  {
    this.selectedState =  event.target.value;
    console.log(this.selectedState);
    if(this.selectedState == APROBADA)
    {
      this.showCredits = true;
    }
    else{
      this.showCredits = false;
    }
  }

  handleCredits(event: any)
  {
    this.totalCredits = event.target.value;
  }

  editState(aux: any)
  {
    this.nameStudent = aux['estudiante']['nombres'] + ' ' + aux['estudiante']['apellidos'];
    this.codeStudent = aux['estudiante']['codigo'];
    this.idInternship = aux['id'];
    this.optionState = this.organizateOptions(aux['estado']);
    if(aux['estado'] === APROBADA)
    {
      this.showCredits = true;
    }
    else{
      this.showCredits = false;
    }
    this.viewEditState.show();
  }

  organizateOptions(state: string)
  {
    const optionTypeAux = [];
    optionTypeAux.push(state);
    for(let i = 0; i < this.optionState.length; i++)
    {
      if(this.optionState[i] != state)
      {
        optionTypeAux.push(this.optionState[i]);
      }
    }
    return optionTypeAux;
  }

  updateState()
  {
    if(this.selectedState != APROBADA)
    {
      this.totalCredits = '0';
    }
    this.internshipService.updateStateInternship(this.idInternship, this.totalCredits , this.selectedState, this.comentary)
    .subscribe(data =>
              {
                this.viewEditState.hide();
                this.getAllInternshipAdmin();
                this.comentary = '';
                this.showCredits = false;
              }, err =>
              {
                //this.viewErroServer.show();
              });
  }


}
