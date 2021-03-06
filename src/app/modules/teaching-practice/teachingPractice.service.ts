import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringApp } from '../../resources/stringApp';
import { TeachingPractice } from '../../models/teachingPractice/teachingPractice';
import { UtilitiesFile } from '../../models/utilities/utilitiesFiles';
import { UtilitiesDate } from '../../models/utilities/utilitiesDate';
const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class TeachingPracticeService {
  stringApp: StringApp;
  utilitiesFile: UtilitiesFile;
  utilitiesData: UtilitiesDate;
  constructor(private httpClient: HttpClient) {
    this.stringApp = new StringApp();
    this.utilitiesFile = new UtilitiesFile();
    this.utilitiesData = new UtilitiesDate();
  }

  getStudent() {
    return  this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'));
  }

  getHoursAndCredits(codeStudent: string) {
    return this.httpClient.get(this.stringApp.URL_SERVICIO_GET_HOURS_AND_CREDITS_TEACHINGPRACTICE_STUDENT + codeStudent );
  }
  getAllTeachingPractice(code: string) {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_TEACHINGPRACTICE + code);
  }

  getAllTeachingPracticeAdmin() {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_TEACHINGPRACTICE_ADMIN);
  }

  updateStateTeachingPractice(id: string, hours: string, state: string, observation: string) {
    const data = JSON.stringify(
      {
        idPracticaDocente: id,
        horas: hours,
        estado: state,
        observacion: observation
      }
    );
    return this.httpClient.post(this.stringApp.URL_SERVICIO_UPDATE_STATE_TEACHINGPRACTICE, data, httpOptions);
  }

  registryTeachingPractice(teachingPractice: TeachingPractice) {
    const formData: FormData = new FormData();
    const metaData = JSON.stringify(
      {
        codigoEstudiante: teachingPractice.getCodeStudent(),
        tipoPracticaDocente: teachingPractice.getTypePractice(),
        fechaInicio: this.utilitiesData.invertToDate(teachingPractice.getDateStart()),
        fechaFin: this.utilitiesData.invertToDate(teachingPractice.getDateEnd()),
        extensionCertificado: this.utilitiesFile.determineTypeFile(teachingPractice.getCertificatePractice())
      }
    );
    formData.append('datos', metaData);
    formData.append('certificado', teachingPractice.getCertificatePractice());
    return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_TEACHING_PRACTICE, formData,
                                {reportProgress: true, observe: 'events'});
  }

  getFileTeachingPractice(id: string, nameFile: string) {
    this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILE_TEACHING_PRACTICE + id + '/' + nameFile, {responseType: 'blob'})
    .subscribe(data => {
        this.utilitiesFile.showFile(data);
      }, err => {

      });
  }

  deleteTeachingPractice(idTeachingPractice: string) {
    return this.httpClient.delete(this.stringApp.URL_SERVICIO_DELETE_TEACHING_PRACTICE + idTeachingPractice);
  }

}
