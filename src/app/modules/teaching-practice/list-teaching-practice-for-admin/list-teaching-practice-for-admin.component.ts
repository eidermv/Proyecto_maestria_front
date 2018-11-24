import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachingPracticeService } from '../teachingPractice.service';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const APROBADA: string = 'Aprobado';
const REPROBADA: string = 'Rechazado';
const POR_VERIFICAR: string = 'Por verificar';

@Component({
  selector: 'app-list-teaching-practice-for-admin',
  templateUrl: './list-teaching-practice-for-admin.component.html'
})
export class ListTeachingPracticeForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  @ViewChild('showEditState') viewEditState: any ;
   codeStudent: string;
   optionsTeachingPractice: Array<string>;
   optionState: Array<string>;
   showTeachingPractice: boolean;
   nameStudent: string;
   showHours: boolean;
   showErrorMax: boolean;
   totalHours: string;
   comentary: string;
   selectedState: string;
   idPublication: string;
   searchTerm: string;
   showFail: boolean;
   msjFail: string;
   p: any;
   /********************************VARIABLES DE INSTANCIA*************/
  teachingPractice: TeachingPractice;
  fieldsForm: FormGroup;

  constructor(private teachingPracticeService: TeachingPracticeService, private formBuilder: FormBuilder)
  {
    this.teachingPractice = new TeachingPractice();
    this.optionState = [POR_VERIFICAR, APROBADA, REPROBADA];
    this.showHours= false;
    this.showErrorMax = false;
    this.optionsTeachingPractice = [];
    this.selectedState = POR_VERIFICAR;
    this.showFail = false;
  }

  getAllTeachingPractice()
  {
    this.teachingPracticeService.getAllTeachingPracticeAdmin()
    .subscribe(data =>
      {
        this.optionsTeachingPractice = data;
      }, err =>
      {
        this.msjFail = 'Error al obtener todas las parcticas docente';
        this.showFail = true;
      });
  }

  ngOnInit() {

    this.fieldsForm = this.formBuilder.group(
      {
        hours:    ['', [Validators.required,
                          Validators.maxLength(3),
                          Validators.pattern('^([0-9])*$'),
                        ]
                    ],
                  });

    this.getAllTeachingPractice();
  }

  showDataTeachingPractice(teachigP: any)
  {
    this.teachingPractice.setTypePractice(teachigP['tipoPracticaDocente']);
    this.teachingPractice.setDateRegister(teachigP['fechaRegistro']);
    this.teachingPractice.setDateStart(teachigP['fechaInicio']);
    this.teachingPractice.setDateEnd(teachigP['fechaFin']);
    this.teachingPractice.setState(teachigP['estado']);
    this.teachingPractice.setHours(teachigP['horas']);
    this.teachingPractice.setObservation(teachigP['observacion']);
    this.teachingPractice.setIdPractice(teachigP['id']);
    this.teachingPractice.setNameStudent(teachigP['estudiante']['nombres'] +' ' + teachigP['estudiante']['apellidos']);
    this.teachingPractice.setCodeStudent(teachigP['estudiante']['codigo']);
    this.showTeachingPractice = true;
  }

  destroyModal(destruir: {cerrar: boolean})
  {
    this.showTeachingPractice = false;
  }


  handleState(event: any)
  {
    this.selectedState =  event.target.value;
    if(this.selectedState == APROBADA)
    {
      this.showHours = true;
    }
    else{
      this.showHours = false;
    }
  }



  editState(aux: any)
  {
    this.nameStudent = aux['estudiante']['nombres'] + ' ' + aux['estudiante']['apellidos'];
    this.codeStudent = aux['estudiante']['codigo'];
    this.idPublication = aux['id'];
    this.selectedState = POR_VERIFICAR;
    this.showHours = false;
    this.viewEditState.show();
  }

  updateState()
  {
    if(this.selectedState != APROBADA)
    {
      this.totalHours = '0';
      this.update();
    }
    else{
      this.totalHours = this.fieldsForm.get('hours').value;
      if(this.totalHours === '')
      {
        this.totalHours = '0';
      }
      const varAux = parseInt(this.totalHours , 10);
      if((varAux > 288) || (varAux < 0))
      {
        this.showErrorMax = true;
      }
      else{
          this.update();
      }
    }
  }

  update()
  {
    this.teachingPracticeService.updateStateTeachingPractice(this.idPublication, this.totalHours , this.selectedState, this.comentary)
        .subscribe(data =>
              {
                this.showHours = false;
                this.viewEditState.hide();
                this.comentary = '';
                this.getAllTeachingPractice();
              }, err =>
              {
               this.viewEditState.hide();
               this.msjFail ='Error al actualizar el estado de la practica';
               this.showFail = true;
              });
  }


}
