import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';
import { Magazine } from '../../../models/publications/magazine';
import { Book } from '../../../models/publications/book';
import { CapBook } from '../../../models/publications/capLibro';
import { EventPublication } from '../../../models/publications/event';
import {HttpEventType} from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilitiesDate } from '../../../models/utilities/utilitiesDate';


@Component({
  selector: 'app-add-publications',
  templateUrl: './add-publications.component.html'
})
export class AddPublicationsComponent implements OnInit {
  /***************************VARIABLES GLOBALES*********** */
  MAGAZINE = 'Revista';
  BOOK = 'Libro';
  CAP_BOK = 'Capitulo Libro';
  EVENT = 'Evento';
  TAM_MAX_FILE = 10240;
  PLACEHOLDER_CONTENT_TABLE = 'Archivo PDF que contenga la tabla de contenido';
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;

  /*************************VARIABLES LOCALES**************** */
  @ViewChild('successModal') viewModalOk: any ;
  @ViewChild('dangerModal') viewModalFail: any ;
  @ViewChild('progressModal') viewProgressRequest: any;
  @ViewChild('categoryTypePublication') cbx_typePublication: any;
  fileToSend: null;
  titleFormAddMagazine: string;
  subtitleFormAddMagazine: string;
  nameBtnAddMagazine: string;
  optionTypePublication: Array<string>;
  showMagazine: boolean;
  showBook: boolean;
  showCapBook: boolean;
  showEvent: boolean;
  msjErroContentTable: string;
  showErrorContentTable: boolean;
  placeholderContentTable: string;
  max_date: string;
  showErrorDateApproved: boolean;
  msjErrorDateApproved: string;
  showErrorDatePublication: boolean;
  msjErrorDatePublication: string;
  nameStudent: string;
  codeStudent: string;
  authorSecondary: string;
  datePublication: string;
  dateAproved: string;
  elementSelect: string;
  progressRequest: string;
  showProgressRequest: boolean;
  titleModalSucces: string;
  subtitleModalSucces: string;
  titleModalError: string;
  subtitleModaErro: string;
  eveent: any;
  urlRedirecTo: string;
  paramsRedirectTo: string;
  enableRedirectTo: boolean;


  /***********************VARIABLES DE INSTANCIA************* */
  fileToContentTable = null;
  utilitiesDate: UtilitiesDate;
  fieldsForm: FormGroup;
  magizine: Magazine;
  book: Book;
  capBook: CapBook;
  event: EventPublication;

  constructor(private publicationsService: PublicationService, private formBuilder: FormBuilder, private router: Router) {
    this.stringValidation = new StringValidation();
    this.utilitiesDate = new UtilitiesDate();
    this.magizine = new Magazine();
    this.book = new Book();
    this.capBook = new CapBook();
    this.event = new EventPublication();
    this.titleFormAddMagazine = 'Datos Para la Revista';
    this.subtitleFormAddMagazine = 'En este formulario ingrese los datos para la revista, recuerde los campos con * son obligatorios.'
                                  + ' No olvide cargar los archivos necesarios';
    this.nameBtnAddMagazine = 'Registrar Revista';
    this.optionTypePublication = ['Elija el tipo de publicación', this.MAGAZINE, this.BOOK, this.CAP_BOK, this.EVENT];
    this.msjErroContentTable = '';
    this.msjErrorDateApproved = '';
    this.msjErrorDatePublication = '';
    this.nameStudent = '';
    this.codeStudent = '';
    this.authorSecondary = '';
    this.dateAproved = '';
    this.datePublication = '';
    this.elementSelect = '';
    this.progressRequest = '0%';
    this.placeholderContentTable = this.PLACEHOLDER_CONTENT_TABLE;
    this.showMagazine = false;
    this.showBook = false;
    this.showCapBook = false;
    this.showEvent = false;
    this.showErrorContentTable = false;
    this.showErrorDateApproved = false;
    this.showErrorDatePublication = false;
    this.showProgressRequest = false;
    this.enableRedirectTo = true;
    this.urlRedirecTo = '/publication/listPublicationsEstudent';
    this.paramsRedirectTo = 'Publicación Registrada Exitosamente';
    this.max_date = this.utilitiesDate.getMaxDate();
  }

  getStudent() {
    this.publicationsService.getStudent()
    .subscribe(data => {
        this.nameStudent = data['nombres'] + ' ' + data['apellidos'];
        this.codeStudent = data['codigo'];
        this.fieldsForm.get('author').setValue(this.nameStudent);
        this.fieldsForm.get('author').disable();
      },
      err => {
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        datePublitaion: [''
                        ],
        dateApproved: ['' , Validators.required],
        secondaryAuthors: ['',
                            [
                              Validators.maxLength(this.stringValidation.MAX_LONG_SECONDARY_AUTHORS),
                            ]
                          ] ,
        author: ['', Validators.required],
      });
      this.getStudent();
  }

  handleContentTable(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if (type_file[1] === 'pdf') {
      if (tam_file > this.TAM_MAX_FILE) {
        this.msjErroContentTable = 'El archivo supera el límite de 10 MB';
        this.showErrorContentTable = true;
      } else {
        this.fileToContentTable = event.target.files[0];
        this.placeholderContentTable = event.target.files[0].name;
        this.showErrorContentTable = false;
        this.showOptionPublication(this.elementSelect);
      }
    } else {
      this.msjErroContentTable = 'Solo se permiten archivos PDF';
      this.showErrorContentTable = true;
    }
  }

  handleTypePublication(event: any) {
    this.elementSelect = event.target.value;
    this.showOptionPublication(this.elementSelect);
  }

  handleDateapproved(event: any) {
    const valueOptionTypePublication = this.cbx_typePublication.nativeElement.value;
    const dateAprrov = this.fieldsForm.get('dateApproved').value;
    const datePublic = this.fieldsForm.get('datePublitaion').value;

    if (datePublic.length === 0) {
      this.showErrorDatePublication = false;
      this.showErrorDateApproved = false;
      this.msjErrorDatePublication = 'Campo opcional';
      if (valueOptionTypePublication !== 'Elija el tipo de publicación' ) {
        this.showOptionPublication(valueOptionTypePublication);
      }
    } else if (dateAprrov > datePublic) {
      this.showErrorDatePublication = true;
      this.msjErrorDatePublication = 'La fecha de publicación no puede ser menor que la fecha de aceptación. Campo opcional';
      this.closeTypePublication();
    } else if (dateAprrov === datePublic) {
      this.showErrorDatePublication = true;
      this.msjErrorDatePublication = 'La fecha de publicación no puede ser igual que la fecha de aceptación. Campo opcional';
      this.closeTypePublication();
    } else {
      this.showErrorDatePublication = false;
      this.showErrorDateApproved = false;
      if (valueOptionTypePublication !== 'Elija el tipo de publicación' ) {
        this.showOptionPublication(valueOptionTypePublication);
      }
    }
  }

  handleApproved(event: any) {
    const valueOptionTypePublication = this.cbx_typePublication.nativeElement.value;
    const dateAprrov = this.fieldsForm.get('dateApproved').value;
    if (dateAprrov.length === 0) {
      this.verifySelectDates();
      this.closeTypePublication();
    } else {
      this.showErrorDateApproved = false;
      if (valueOptionTypePublication !== 'Elija el tipo de publicación' ) {
        this.showOptionPublication(valueOptionTypePublication);
      }
    }
  }

  closeTypePublication() {
    this.showBook = false;
    this.showCapBook = false;
    this.showEvent = false;
    this.showMagazine = false;
  }

  showOptionPublication(elementSelected: string) {
    if (elementSelected === this.MAGAZINE) {
      if (this.verifySelectDates() && this.verifyContentTable()) {
        this.showMagazine = true;
        this.showBook = false;
        this.showCapBook = false;
      }
    } else if (elementSelected === this.BOOK) {
      if (this.verifySelectDates()  && this.verifyContentTable()) {
        this.showMagazine = false;
        this.showBook = true;
        this.showCapBook = false;
        this.showEvent = false;
      }
    } else if (elementSelected === this.CAP_BOK) {
      if (this.verifySelectDates()  && this.verifyContentTable()) {
        this.showMagazine = false;
        this.showBook = false;
        this.showCapBook = true;
        this.showEvent = false;
      }
    } else if (elementSelected === this.EVENT) {
      if (this.verifySelectDates()  && this.verifyContentTable()) {
      this.showMagazine = false;
      this.showBook = false;
      this.showCapBook = false;
      this.showEvent = true;
      }
    } else {
      this.closeTypePublication();
    }

  }

  verifySelectDates() {
    if ( this.showErrorDatePublication) {
      return false;
    }
    if ((this.fieldsForm.get('dateApproved').value.length === 0) || this.showErrorDateApproved) {
      if ( this.showErrorDateApproved) {
        this.showErrorDateApproved = true;
        this.msjErrorDateApproved = 'Este campo es obligatorio y presenta un error';
      } else {
        this.showErrorDateApproved = true;
        this.msjErrorDateApproved = 'Este campo es obligatorio';
      }
      return false;
    } else {
      this.showErrorDateApproved = false;
      this.showErrorDatePublication = false;
      return true;
    }
  }

  verifyContentTable() {
    if (this.placeholderContentTable === this.PLACEHOLDER_CONTENT_TABLE) {
      this.showErrorContentTable = true;
      this.msjErroContentTable = 'Este campo es obligatorio';
      return false;
    } else {
      return true;
    }
  }

  getDataMagazine(dateMagazine: {doi: string, title: string, name: string, category: string, filePDFArticle: File,
                  fileScreenShotEmail: File, fileScreenshotClasification: File }) {
      this.getDefaultInfoPublication();
      this.magizine.setAuthor(this.nameStudent);
      this.magizine.setCode(this.codeStudent);
      this.magizine.setSecondaryAuthors(this.authorSecondary);
      this.magizine.setDateAproved(this.dateAproved);
      this.magizine.setDatePublication(this.datePublication);
      this.magizine.setContenTable(this.fileToContentTable);
      this.magizine.setDoi(dateMagazine.doi);
      this.magizine.setTitleArticle(dateMagazine.title);
      this.magizine.setNameMagazine(dateMagazine.name);
      this.magizine.setCategoryMagazine(dateMagazine.category);
      this.magizine.setArticlePDF(dateMagazine.filePDFArticle);
      this.magizine.setScreenShotEmail(dateMagazine.fileScreenShotEmail);
      this.magizine.setScreenShotClasification(dateMagazine.fileScreenshotClasification);

    this.publicationsService.registryMagazine(this.magizine)
    .subscribe(event => {
        this.eveent = event;
        this.showProgressRequest = true;
      }, err => {
        this.showModalFail('No se pudo registrar la publicación de revista');
      });
  }

  getDataBook(dataBook: {isbn: string, title: string, editorial: string, city: string, country: string
              fileBook: File, fileCertificate: File}) {
    this.getDefaultInfoPublication();
    this.book.setAuthor(this.nameStudent);
    this.book.setCode(this.codeStudent);
    this.book.setSecondaryAuthors(this.authorSecondary);
    this.book.setDateAproved(this.dateAproved);
    this.book.setDatePublication(this.datePublication);
    this.book.setContenTable(this.fileToContentTable);
    this.book.setIsbn(dataBook.isbn);
    this.book.setTitleBook(dataBook.title);
    this.book.setEditorial(dataBook.editorial);
    this.book.setCounty(dataBook.country);
    this.book.setCity(dataBook.city);
    this.book.setBookPDF(dataBook.fileBook);
    this.book.setCertificateEditorial(dataBook.fileCertificate);

    this.publicationsService.registryBook(this.book)
    .subscribe(event => {
        this.eveent = event;
        this.showProgressRequest = true;
      }, err => {
        this.showModalFail('No se pudo registrar la publicación de libro');
      });
  }

  getDatePublicationCapBook(dataCapBook: {isbn: string, title: string, editorial: string, titleCapLibro: string
    fileBook: File, fileCertificate: File}) {
    this.getDefaultInfoPublication();
    this.capBook.setAuthor(this.nameStudent);
    this.capBook.setCode(this.codeStudent);
    this.capBook.setSecondaryAuthors(this.authorSecondary);
    this.capBook.setDateAproved(this.dateAproved);
    this.capBook.setDatePublication(this.datePublication);
    this.capBook.setContenTable(this.fileToContentTable);
    this.capBook.setIsbn(dataCapBook.isbn);
    this.capBook.setTitleCapBook(dataCapBook.titleCapLibro);
    this.capBook.setTitleBook(dataCapBook.title);
    this.capBook.setEditorial(dataCapBook.editorial);
    this.capBook.setCapBook(dataCapBook.fileBook);
    this.capBook.setCertificateCapBook(dataCapBook.fileCertificate);

    this.publicationsService.registyCapBook(this.capBook)
    .subscribe(event => {
        this.eveent = event;
        this.showProgressRequest = true;
      }, err => {
        this.showModalFail('No se pudo registrar la publicación de capitulo de libro');
      });
  }

  getDataaEvent(dataEvent: {doi: string, issn: string, typEvent: string, city: string, country: string
    titlePresentation: string, nameEvent: string, dateStart: string, dateFinish: string, filePresentation: File,
    fileCertificate: File}) {
    this.getDefaultInfoPublication();
    this.event.setAuthor(this.nameStudent);
    this.event.setCode(this.codeStudent);
    this.event.setSecondaryAuthors(this.authorSecondary);
    this.event.setDateAproved(this.dateAproved);
    this.event.setDatePublication(this.datePublication);
    this.event.setContenTable(this.fileToContentTable);
    this.event.setDoi(dataEvent.doi);
    this.event.setDataStart(dataEvent.dateStart);
    this.event.setDataFinish(dataEvent.dateFinish);
    this.event.setISSN(dataEvent.issn);
    this.event.setTittlePresentation(dataEvent.titlePresentation);
    this.event.setNameEvent(dataEvent.nameEvent);
    this.event.setTypeEvent(dataEvent.typEvent);
    this.event.setCounty(dataEvent.country);
    this.event.setCity(dataEvent.city);
    this.event.setPresentationPDF(dataEvent.filePresentation);
    this.event.setCertificateEvent(dataEvent.fileCertificate);

    this.publicationsService.registryEvent(this.event)
    .subscribe(event => {
        this.eveent = event;
        this.showProgressRequest = true;
      }, err => {
        this.showModalFail('No se pudo registrar la publicación de evento');
      });
  }

  showModalFail(titleModal: string) {
    this.showProgressRequest = false;
    this.titleModalError = titleModal;
    this.subtitleModaErro = 'Error interno en el servidor';
    this.viewModalFail.show();
  }

  getDefaultInfoPublication() {
    this.authorSecondary = this.fieldsForm.get('secondaryAuthors').value;
    this.dateAproved = this.fieldsForm.get('dateApproved').value;
    this.datePublication = this.fieldsForm.get('datePublitaion').value;
  }

}
