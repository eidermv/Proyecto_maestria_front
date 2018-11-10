import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicationService } from '../publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';
import { Magazine } from '../../../models/publications/magazine';
import { Book } from '../../../models/publications/book';

@Component({
  selector: 'app-add-publications',
  templateUrl: './add-publications.component.html'
})
export class AddPublicationsComponent implements OnInit {
  /***************************VARIABLES GLOBALES*********** */
  MAGAZINE: string = 'Revista';
  BOOK: string = 'Libro';
  CAP_BOK: string = 'Capitulo Libro';
  EVENT: string = 'Evento';
  TAM_MAX_FILE : number = 10240;
  PLACEHOLDER_CONTENT_TABLE: string = 'Seleccione un archivo PDF que contenga la tabla de contenido';
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;

  /*************************VARIABLES LOCALES**************** */
  @ViewChild('categoryTypePublication') cbx_typePublication: any;
  fileToSend: null;
  titleFormAddMagazine: string;
  subtitleFormAddMagazine: string;
  nameBtnAddMagazine: string;
  optionTypePublication:Array<string>;
  showMagazine: boolean;
  showBook: boolean;
  showCapBook: boolean;
  showEvent: boolean;
  msjErroContentTable: string;
  showErrorContentTable: boolean;
  placeholderContentTable: string;
  today: Date;
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

  /***********************VARIABLES DE INSTANCIA************* */
  fileToContentTable = null;
  fieldsForm: FormGroup;
  magizine: Magazine;
  book: Book;

  constructor(private publicationsService: PublicationService, private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.magizine = new Magazine();
    this.book = new Book();
    this.titleFormAddMagazine = 'Datos Para la Revista';
    this.subtitleFormAddMagazine = 'En este formulario ingrese los datos para la revista, recuerde los campos con * son obligatorios.'
                                  +' No olvide cargar los archivos necesarios';
    this.nameBtnAddMagazine = 'Registrar Revista';
    this.optionTypePublication= ['Elija el tipo de publicacion', this.MAGAZINE, 'Evento', this.BOOK, this.CAP_BOK, this.EVENT];
    this.msjErroContentTable = '';
    this.msjErrorDateApproved = '';
    this.msjErrorDatePublication = '';
    this.nameStudent ='';
    this.codeStudent = '';
    this.authorSecondary = '';
    this.dateAproved = '';
    this.datePublication = '';
    this.elementSelect = '';
    this.placeholderContentTable =this.PLACEHOLDER_CONTENT_TABLE;
    this.showMagazine = false;
    this.showBook = false;
    this.showCapBook = false;
    this.showEvent = false;
    this.showErrorContentTable = false;
    this.showErrorDateApproved = false;
    this.showErrorDatePublication = false;
    this.today = new Date();
    this.setMaxDate();
  }

  getStudent()
  {
    this.publicationsService.getStudent();
    this.nameStudent = sessionStorage.getItem('nameStudent');
    this.codeStudent = sessionStorage.getItem('code');
    this.fieldsForm.get('author').setValue(this.nameStudent);
    this.fieldsForm.get('author').disable();
  }
  setMaxDate()
  {
    if(this.today.getDate() < 10)
    {
      this.max_date = this.today.getFullYear() + '-' + (this.today.getMonth()+ 1) + '-' +'0'+ this.today.getDate();
    }
    else{
      this.max_date = this.today.getFullYear() + '-' + (this.today.getMonth()+ 1) + '-' + this.today.getDate();
    }
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        datePublitaion: ['', Validators.required
                        ],
        dateApproved: ['' , Validators.required],
        secondaryAuthors: ['',
                            [
                              Validators.maxLength(this.stringValidation.MAX_LONG_SECONDARY_AUTHORS),
                            ]
                          ] ,
        author:['', Validators.required],
      });
      this.getStudent();
  }

  handleContentTable(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'pdf')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErroContentTable = 'El archivo supera el limite de 10 MB';
        this.showErrorContentTable = true;
      }
      else{
        this.fileToContentTable = event.target.files[0];
        this.placeholderContentTable= event.target.files[0].name;
        this.showErrorContentTable = false;
        this.showOptionPublication(this.elementSelect);
      }
    }
    else{
      this.msjErroContentTable= 'Solo se permiten archivos PDF';
      this.showErrorContentTable = true;
    }
  }

  handleTypePublication(event: any)
  {
    this.elementSelect = event.target.value;
    this.showOptionPublication(this.elementSelect);
  }

  showOptionPublication(elementSelected: string)
  {
    if(elementSelected == this.MAGAZINE)
    {
      if(this.verifySelectDates() && this.verifyContentTable())
      {
        this.showMagazine = true;
        this.showBook = false;
        this.showCapBook = false;
      }
    }
    else if(elementSelected == this.BOOK)
    {
      if(this.verifySelectDates()  && this.verifyContentTable())
      {
        this.showMagazine = false;
        this.showBook = true;
        this.showCapBook =false;
        this.showEvent = false;
      }
    }
    else if(elementSelected == this.CAP_BOK)
    {
      if(this.verifySelectDates()  && this.verifyContentTable())
      {
        this.showMagazine = false;
        this.showBook = false;
        this.showCapBook = true;
        this.showEvent = false;
      }
    }
    else if(elementSelected == this.EVENT)
    {
      if(this.verifySelectDates()  && this.verifyContentTable())
      {
      this.showMagazine = false;
      this.showBook = false;
      this.showCapBook = false;
      this.showEvent = true;
      }
    }
    else{
      this.showMagazine = false;
      this.showBook = false;
      this.showCapBook = false;
      this.showEvent = false;
    }

  }

  verifySelectDates()
  {

    if((this.fieldsForm.get('datePublitaion').value.length == 0) || this.showErrorDatePublication)
    {

      if(this.showErrorDatePublication)
      {
        this.showErrorDatePublication = true;
        this.msjErrorDatePublication = 'Este campo es obligatorio y presenta un error';
      }
      else{
        this.showErrorDatePublication = true;
        this.msjErrorDatePublication = 'Este campo es obligatorio';
      }
      return false;
    }
    else if((this.fieldsForm.get('dateApproved').value.length == 0) || this.showErrorDateApproved)
    {
      if( this.showErrorDateApproved)
      {
        this.showErrorDateApproved = true;
        this.msjErrorDateApproved = 'Este campo es obligatorio y presenta un error';
      }else{
        this.showErrorDateApproved = true;
        this.msjErrorDateApproved = 'Este campo es obligatorio';
      }
      return false;
    }
    else{
      this.showErrorDateApproved = false;
      this.showErrorDatePublication = false;
      return true;
    }
  }

  verifyContentTable()
  {
    if(this.placeholderContentTable == this.PLACEHOLDER_CONTENT_TABLE)
    {
      this.showErrorContentTable= true;
      this.msjErroContentTable = 'Este campo es obligatorio';
      return false;
    }
    else{
      return true;
    }
  }

  handleDateapproved(event: any)
  {
    const dateAprrov = this.fieldsForm.get('dateApproved').value;
    const datePublic = this.fieldsForm.get('datePublitaion').value;
    if (dateAprrov < datePublic)
    {
      this.showErrorDateApproved = true;
      this.msjErrorDateApproved = 'La fecha de aceptacion no puede ser menor que la fecha de publicacion';
    }
    else if(dateAprrov == datePublic)
    {
      this.showErrorDateApproved = true;
      this.msjErrorDateApproved = 'La fecha de aceptacion no puede ser igual que la fecha de publicacion';
    }
    else{
      this.showErrorDateApproved = false;
      this.showErrorDatePublication = false;
      this.dateAproved = dateAprrov;
      const valueOptionTypePublication = this.cbx_typePublication.nativeElement.value;
      if (valueOptionTypePublication != 'Elija el tipo de publicacion' )
      {
        this.showOptionPublication(valueOptionTypePublication);
      }
    }
  }


  getDataMagazine(dateMagazine: {doi: string, title: string, name: string, category: string, filePDFArticle: File,
                  fileScreenShotEmail: File, fileScreenshotClasification: File })
  {
    //console.log(dateMagazine.filePDFArticle.name);
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
    .subscribe(data =>
      {
        console.log('registre', data);
      },err =>
      {
        console.log('no registre');
      });
    //this.magizine.setSecondaryAuthors(this.);
   /* this.magizine.setSecondaryAuthors();
    this.magizine.setDatePublication();
    this.magizine.setDateAproved(this.fi);*/
  }

  getDataBook(dataBook: {isbn: string, title: string, editorial: string, city: string, country: string
              fileBook: File, fileCertificate: File})
  {
    console.log('llegue con datos del libro'+ dataBook.editorial);
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
    .subscribe(event =>
      {
        console.log('registre', event);
      },err =>
      {
        console.log('no registre');
      });
  }

  getDatePublicationCapBook(dataCapBook: {isbn: string, title: string, editorial: string, titleCapLibro: string
    fileBook: File, fileCertificate: File})
  {
    console.log('llegue con cap ligro' + dataCapBook.isbn);
  }

  getDataaEvent(dataEvent: {doi: string, issn: string, typEvent: string, city: string, country: string
    titlePresentation: string,nameEvent: string,dateStart: string,dateFinish: string,filePresentation: File,
    fileCertificate: File})
  {
    console.log('llegue con datos del evento: '+ dataEvent.dateFinish);
  }

  getDefaultInfoPublication()
  {
    this.authorSecondary = this.fieldsForm.get('secondaryAuthors').value;
    this.dateAproved = this.fieldsForm.get('dateApproved').value;
    this.datePublication = this.fieldsForm.get('datePublitaion').value;
    return true;
  }

}
