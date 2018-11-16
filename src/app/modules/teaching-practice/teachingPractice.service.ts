import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringApp } from '../../resources/stringApp';
import { TeachingPractice } from '../../models/teachingPractice/teachingPractice';

@Injectable()
export class TeachingPracticeService
{
  stringApp: StringApp;
  constructor(private httpClient: HttpClient)
  {
    this.stringApp = new StringApp();
  }

  getStudent()
  {
    return  this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'));
  }

  registryTeachingPractice(teachingPractice: TeachingPractice)
  {
    const formData: FormData = new FormData();
    const metaData = JSON.stringify(
      {
        codigoEstudiante: teachingPractice.getCodeStudent(),
        tipoPracticaDocente: teachingPractice.getTypePractice(),
        fechaInicio: this.invertToDate(teachingPractice.getDateStart()),
        fechaFin: this.invertToDate(teachingPractice.getDateEnd()),
        extensionCertificado: this.determineTypeFile(teachingPractice.getCertificatePractice())
      }
    );
    formData.append('datos', metaData);
    formData.append('certificado', teachingPractice.getCertificatePractice());
    return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_TEACHING_PRACTICE, formData,
                                {reportProgress: true, observe: 'events'});
  }

  determineTypeFile(file: File)
  {
    const returnFile = file.type.split('/');
    if(returnFile[1] == 'jpeg')
    {
      returnFile[1] = 'jpg';
    }
    return returnFile[1];
  }

  invertToDate(date: string)
  {
    const dateAux = date.split('-');
    var dateReturn: string;
    dateReturn = '';
    for(let i = dateAux.length; i > 0; i--)
    {

      if((i-1) == 0)
      {
        dateReturn = dateReturn + dateAux[i-1];
      }
      else{
        dateReturn = dateReturn + dateAux[i-1] + '-';
      }
    }
    return dateReturn;
  }

}
