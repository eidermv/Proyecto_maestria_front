import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';

/***************************VARIABLES GLOBALES******** */
const APROBADA: string = 'Aprobado';
const REPROBADA: string = 'Rechazado';
const POR_VERIFICAR: string = 'Por verificar';

@Component({
  selector: 'app-list-publication-for-admin',
  templateUrl: './list-publication-for-admin.component.html'
})
export class ListPublicationForAdminComponent implements OnInit {
  /*********************************STIRNG APP******************* */
  stringValidation: StringValidation;
 /********************************VARIABLES LOCALES****************** */
 @ViewChild('showEditState') viewEditState: any ;
 @ViewChild('dangerModal') viewErroServer: any;
 @ViewChild('state') cbxState: any ;
 @ViewChild('credits') cbxCredits: any ;
  optionsPublicationsStudents: Array<string>;
  optionsCredits: Array<string>;
  optionState: Array<string>;
  typePublication: string;
  idPublication: string;
  selectedState: string;
  totalCredits: string;
  comentary: string;
  nameStudent: string;
  codeStudent: string;
  showModalPublication: boolean;
  showCredits: boolean;
  searchTerm: string;
  showEmpty: boolean;
  p: any;
  /******************VARIABLES DE INSTANCIA********************** */
  fieldsForm: FormGroup;


  constructor(private publicationsService: PublicationService, private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.optionsPublicationsStudents = [];
    this.optionState = [POR_VERIFICAR, APROBADA, REPROBADA];
    this.optionsCredits = ['1', '2', '3', '4', '5', '6'];
    this.showModalPublication = false;
    this.showCredits = false;
    this.showEmpty = false;
    this.idPublication = '';
    this.typePublication = '';
    this.searchTerm = '';
    this.comentary = '';
    this.selectedState = POR_VERIFICAR;
    this.getAllStudent();
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
       observation: ['', [Validators.maxLength(this.stringValidation.MAX_LONG_OBSERVATION),]]
                  });
  }

  getAllStudent()
  {
    this.publicationsService.getAllPublications()
    .subscribe(data =>{
      this.optionsPublicationsStudents =  data;
      if(this.optionsPublicationsStudents.length == 0)
      {
        this.showEmpty = true;
      }
      else{
        this.showEmpty = false;
      }
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
    this.idPublication = aux['id'];
    this.selectedState = POR_VERIFICAR;
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
    if(this.fieldsForm.get('observation').value.length <= 300)
    {
      if(this.selectedState != APROBADA)
      {
        this.totalCredits = '0';
      }
      this.comentary = this.fieldsForm.get('observation').value;
      this.fieldsForm.get('observation').setValue('');
      this.publicationsService.updateStatePublication(this.idPublication, this.totalCredits , this.selectedState, this.comentary)
      .subscribe(data =>
                {
                  this.viewEditState.hide();
                  this.getAllStudent();
                  this.comentary = '';
                }, err =>
                {
                  this.viewErroServer.show();
                });
    }
  }

}
