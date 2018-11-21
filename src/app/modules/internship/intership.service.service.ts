import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringApp } from '../../resources/stringApp';
import { Internship } from '../../models/internship/internship';
import { UtilitiesDate } from '../../models/utilities/utilitiesDate';
import { UtilitiesFile } from '../../models/utilities/utilitiesFiles';

@Injectable()
export class InternshipService {
  stringApp: StringApp;
  utilitiesDate : UtilitiesDate;
  utilitiesFile : UtilitiesFile;
  constructor(private httpClient: HttpClient)
  {
    this.stringApp = new StringApp();
    this.utilitiesDate = new UtilitiesDate();
    this.utilitiesFile = new UtilitiesFile();
  }

  getStudent()
  {
    return  this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'));
  }

  getAllInternshipForStudent(code: string)
  {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_INTERNSHIP + code);
  }

  getAllInternshipForAdmin()
  {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_INTERNSHIP_ADMIN);
  }

  getFileInternship(idInternship: string, namaFile: string)
  {
    this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILE_INTERNSHIP + idInternship + '/' + namaFile, {responseType: 'blob'})
    .subscribe(data=>
      {
        this.utilitiesFile.showFile(data);
      },err =>
      {

      });
  }

  deleteInternship(idInternship: string)
  {
    return this.httpClient.delete(this.stringApp.URL_SERVICIO_DELETE_INTERNSHIP + idInternship);
  }

  registryInternship(internship: Internship)
  {
    const formData: FormData = new FormData();
    const metaData = JSON.stringify(
      {
        codigoEstudiante: internship.getCodeStudent(),
        fechaInicio: this.utilitiesDate.invertToDate(internship.getDataIntershipStart()),
        fechaFin: this.utilitiesDate.invertToDate(internship.getDataIntershipEnd()),
        tipoPasantia: internship.getTypeIntership(),
        institucion: internship.getInstitution(),
        dependencia: internship.getDependence(),
        nombreDependencia: internship.getNameDependence(),
        responsable: internship.getTutorInternship(),
        extensionInforme: this.utilitiesFile.determineTypeFile(internship.getReportInternship()),
        extensionCertificado: this.utilitiesFile.determineTypeFile(internship.getCertificateInternship())
      }
    );
    formData.append('datos', metaData);
    formData.append('informe', internship.getReportInternship());
    formData.append('certificado', internship.getCertificateInternship());
    return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_INTERNSHIP, formData, {reportProgress: true, observe: 'events'});
  }
}
