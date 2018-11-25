import { Component, OnInit, ViewChild } from '@angular/core';
import { InternshipService } from '../intership.service.service';
import { Internship } from '../../../models/internship/internship';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';
/***************************VARIABLES GLOBALES******** */
const APROBADA: string = 'Aprobado';
const REPROBADA: string = 'Rechazado';
const POR_VERIFICAR: string = 'Por verificar';

@Component({
  selector: 'app-list-internship-for-admin',
  templateUrl: './list-internship-for-admin.component.html'
})
export class ListInternshipForAdminComponent implements OnInit {

  /*********************************STIRNG APP******************* */
  stringValidation: StringValidation;

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
  searchTerm: string;
  showFail: boolean;
  showEmpty: boolean;
  msjFail: string;
  p: any;
  /****************************VARIABLES DE INSTANCIA*********************/
  internship: Internship;
  fieldsForm: FormGroup;


  constructor(private internshipService: InternshipService, private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.internship = new Internship();
    this.optionState = [POR_VERIFICAR, APROBADA, REPROBADA];
    this.optionsCredits = ['1', '2', '3', '4', '5', '6'];
    this.optionsInternship = [];
    this.showCredits = false;
    this.showInternship = false;
    this.showFail = false;
    this.showEmpty = false;
    this.totalCredits = '0';
    this.selectedState = POR_VERIFICAR;
  }

  getAllInternshipAdmin()
  {
    this.internshipService.getAllInternshipForAdmin()
    .subscribe(data =>
      {
        this.optionsInternship = data;
        if(this.optionsInternship.length == 0)
        {
          this.showEmpty = true;
        }
        else{
          this.showEmpty = false;
        }
      }, err =>
      {
        this.msjFail = 'Error al obtener todas las pasantias';
        this.showFail = true;
      })
  }

  ngOnInit() {

    this.fieldsForm = this.formBuilder.group(
      {
       observation: ['', [Validators.maxLength(this.stringValidation.MAX_LONG_OBSERVATION),]]
                  });
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
    this.selectedState = POR_VERIFICAR;
    this.viewEditState.show();
  }

  updateState()
  {
    if(this.fieldsForm.get('observation').value.length <= 300)
    {
      if(this.selectedState != APROBADA)
      {
        this.totalCredits = '0';
      }
      this.comentary = this.fieldsForm.get('observation').value;
      this.fieldsForm.get('observation').setValue('');
      this.internshipService.updateStateInternship(this.idInternship, this.totalCredits , this.selectedState, this.comentary)
      .subscribe(data =>
                {
                  this.viewEditState.hide();
                  this.getAllInternshipAdmin();
                  this.comentary = '';
                  this.showCredits = false;
                }, err =>
                {
                  this.viewEditState.hide();
                  this.msjFail = 'Error al actualizar el estado de la pasantia';
                  this.showFail = true;
                });
      }
  }


}
