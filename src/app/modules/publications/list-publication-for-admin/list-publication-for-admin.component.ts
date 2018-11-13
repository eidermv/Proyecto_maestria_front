import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';

/***************************VARIABLES GLOBALES******** */
const APROBADA: string = 'Aprobado';
const REPROBADA: string = 'Rechazado';
const POR_VERIFICAR: string = 'Por verificar';

@Component({
  selector: 'app-list-publication-for-admin',
  templateUrl: './list-publication-for-admin.component.html'
})
export class ListPublicationForAdminComponent implements OnInit {
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
  showModalPublication: boolean;
  showCredits: boolean;

  constructor(private publicationsService: PublicationService)
  {
    this.optionsPublicationsStudents = [];
    this.optionState = [POR_VERIFICAR, APROBADA, REPROBADA];
    this.optionsCredits = ['1', '2', '3', '4', '5', '6'];
    this.showModalPublication = false;
    this.showCredits = false;
    this.idPublication = '';
    this.typePublication = '';
    this.selectedState = POR_VERIFICAR;
    this.getAllStudent();
  }

  ngOnInit() {
  }

  getAllStudent()
  {
    this.publicationsService.getAllPublications()
    .subscribe(data =>{
      this.optionsPublicationsStudents =  data;
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
    this.idPublication = aux['id'];
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
    this.publicationsService.updateStatePublication(this.idPublication, this.totalCredits , this.selectedState)
    .subscribe(data =>
              {
                this.viewEditState.hide();
                this.getAllStudent();
              }, err =>
              {
                this.viewErroServer.show();
              });
  }

}
