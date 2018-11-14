import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Line} from '../../models/line';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Magazine } from '../../models/publications/magazine';
import { Book } from '../../models/publications/book';
import { EventPublication } from '../../models/publications/event';
import { CapBook } from '../../models/publications/capLibro';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/Rx';

/***************************VARIABLES GLOBALES*********** */
const MAGAZINE: string = 'Revista';
const BOOK: string = 'Libro';
const CAP_BOK: string = 'Capítulo de libro';
const EVENT: string = 'Evento';


//{ headers : new HttpHeaders({ 'Acept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'})
//,reportProgress: true, observe: 'events'});

const httpOptions =
{
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
}




@Injectable()
export class PublicationService
{
  stringApp: StringApp = new StringApp();

  constructor(private httpClient: HttpClient,  private router: Router, private sanitizer: DomSanitizer)
  {

  }

    getStudent()
    {
     return  this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'));
    }

    getPublicationStudent(studentCode: string)
    {
      return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETPUBLICATIONS_STUDENT + studentCode);
    }

    getAllPublications()
    {
      return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETALL_PUBLICATION, httpOptions);
    }

    updateStatePublication(id: string, credits: string, state: string)
    {
      const data = JSON.stringify(
                                  {
                                    idPublicacion: id,
                                    creditos: credits,
                                    estado: state
                                  }
                                 );
      return this.httpClient.post(this.stringApp.URL_SERVICIO_UPDATE_STATE, data, httpOptions);
    }

    getPublication(typePublication: string, idPublication: string)
    {
      switch (typePublication)
      {
        case MAGAZINE:
            return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETPUBLICATION_MAGAZINE + idPublication);

        case BOOK:
            return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETPUBLICATION_BOOK + idPublication);

        case CAP_BOK:
            return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETPUBLICATION_CAPBOOK + idPublication);
        case EVENT:
          return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GETPUBLICATION_EVENT + idPublication);
      }
    }

    getFile(typePublication: string, typeFile: string, idPublication: string)
    {
      switch (typePublication)
      {
        case MAGAZINE:
             this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILES_MAGAZINE + idPublication+ '/' + typeFile,
             {responseType: 'blob'})
             .subscribe(data =>
             {
               this.showFile(data);
             });
            break;

        case BOOK:
             this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILES_BOOK+ idPublication + '/' + typeFile,{responseType: 'blob'})
             .subscribe(data =>
              {
                this.showFile(data);
              });
            break;

        case CAP_BOK:
             this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILES_CAPBOKK + idPublication + '/' + typeFile,{responseType: 'blob'})
             .subscribe(data =>
              {
                this.showFile(data);
              });
            break;

        case EVENT:
           this.httpClient.get(this.stringApp.URL_SERVICIO_GETFILES_EVENT + idPublication + '/' + typeFile,{responseType: 'blob'})
           .subscribe(data =>
            {
              this.showFile(data);
            });
          break;
      }
    }

    deletePublication(id: string)
    {
      const data = JSON.stringify(
        {
          idPublicacion: id
        });
      return this.httpClient.post(this.stringApp.URL_sERVICIO_DELETE_PUBLICATION, data,httpOptions);
    }

    registryMagazine(magazine: Magazine)
    {
      const formData: FormData = new FormData();
      const metaData= JSON.stringify(
        {
          codigoEstudiante: magazine.getCode(),
          autor: magazine.getAuthor(),
          autoresSecundarios: magazine.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(magazine.getDateAproved()),
          fechaPublicacion: this.invertToDate(magazine.getDatePublication()),
          doi: magazine.getDoi(),
          tituloArticulo: magazine.getTitleArticle(),
          nombreRevista: magazine.getNameMagazine(),
          categoria: magazine.getCategoryMagazine(),
          extensionIndice: this.determineTypeFile(magazine.getContenTable()),
          extensionArticulo: this.determineTypeFile(magazine.getArticlePDF()),
          extensionCorreoAceptacion: this.determineTypeFile(magazine.getScreenShotEmail()),
          extensionClasificacionRevista: this.determineTypeFile(magazine.getScreenShotClasification())
        }
      );
      formData.append('datos', metaData);
      formData.append('indice', magazine.getContenTable());
      formData.append('articulo', magazine.getArticlePDF());
      formData.append('correoAceptacion', magazine.getScreenShotEmail());
      formData.append('clasificacionRevista', magazine.getScreenShotClasification());
      return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_PUBLICATIONS, formData,{reportProgress: true, observe: 'events'});
    }

    registryBook(book: Book)
    {
      const formData: FormData = new FormData();
      console.log('hasta antes de aca funciona'+ book.getDatePublication());
      const metaData= JSON.stringify(
        {
          codigoEstudiante: book.getCode(),
          autor: book.getAuthor(),
          autoresSecundarios: book.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(book.getDateAproved()),
          fechaPublicacion: this.invertToDate(book.getDatePublication()),
          isbn: book.getIsbn(),
          tituloLibro: book.getTitleBook(),
          editorial: book.getEditorial(),
          pais: book.getCounty(),
          ciudad: book.getCity(),
          extensionIndice: this.determineTypeFile(book.getContenTable()),
          extensionLibro: this.determineTypeFile(book.getBookPDF()),
          extensionCertificadoEditorial: this.determineTypeFile(book.getCertificateEditorial()),
        }
      );
      formData.append('datos', metaData);
      formData.append('indice', book.getContenTable());
      formData.append('libro', book.getBookPDF());
      formData.append('certificadoEditorial', book.getCertificateEditorial());

      return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_BOOK, formData, {reportProgress: true, observe: 'events'});
    }

    registryEvent(event: EventPublication)
    {
      const formData: FormData = new FormData();
      const metaData = JSON.stringify(
        {
          codigoEstudiante: event.getCode(),
          autor: event.getAuthor(),
          autoresSecundarios: event.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(event.getDateAproved()),
          fechaPublicacion: this.invertToDate(event.getDatePublication()),
          doi: event.getDoi(),
          fechaInicio: this.invertToDate(event.getDataStart()),
          fechaFin: this.invertToDate(event.getDataFinish()),
          issn: event.getISSN(),
          tituloPonencia: event.getTittlePresentation(),
          nombreEvento: event.getNameEvent(),
          tipoEvento: event.getTypeEvent(),
          pais: event.getCounty(),
          ciudad: event.getCity(),
          extensionIndice: this.determineTypeFile(event.getContenTable()),
          extensionPonencia: this.determineTypeFile(event.getPresentationPDF()),
          extensionCertificadoEvento: this.determineTypeFile(event.getCertificateEvent()),
        });

        formData.append('datos', metaData);
        formData.append('indice', event.getContenTable());
        formData.append('ponencia', event.getPresentationPDF());
        formData.append('certificadoEvento', event.getCertificateEvent());

        return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_EVENT, formData, {reportProgress: true, observe: 'events'});
    }

    registyCapBook(capBook: CapBook)
    {
      console.log('llegue a la pet' + capBook.getCapBook().name);
      const formData: FormData = new FormData();
      const metaData = JSON.stringify(
        {
          codigoEstudiante: capBook.getCode(),
          autor: capBook.getAuthor(),
          autoresSecundarios: capBook.getSecondaryAuthors(),
          fechaAceptacion: this.invertToDate(capBook.getDateAproved()),
          fechaPublicacion: this.invertToDate(capBook.getDatePublication()),
          isbn: capBook.getIsbn(),
          tituloCapituloLibro: capBook.getTitleCapBook(),
          tituloLibro: capBook.getTitleBook(),
          editorial: capBook.getEditorial(),
          extensionIndice: this.determineTypeFile(capBook.getContenTable()),
          extensionCapituloLibro: this.determineTypeFile(capBook.getCapBook()),
          extensionCertificadoEditorial: this.determineTypeFile(capBook.getCertificateCapBook())
        });
        formData.append('datos', metaData);

        formData.append('capituloLibro', capBook.getCapBook());
        formData.append('indice', capBook.getContenTable());
        formData.append('certificadoEditorial', capBook.getCertificateCapBook());
        return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_CAP_BOOK, formData, {reportProgress: true, observe: 'events'});
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

    showFile(data : any)
    {
      let fileUrl = window.URL.createObjectURL(data);
      window.open(fileUrl);
    }

  }


