import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringValidation } from '../../../resources/stringValidation';

@Component({
  selector: 'app-add-publications',
  templateUrl: './add-publications.component.html'
})
export class AddPublicationsComponent implements OnInit {
  /***************************VARIABLES GLOBALES*********** */
  MAGAZINE: string = 'Revista';
  TAM_MAX_FILE : number = 10240;
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;

  /*************************VARIABLES LOCALES**************** */
  fileToSend: null;
  titleFormAddMagazine: string;
  subtitleFormAddMagazine: string;
  nameBtnAddMagazine: string;
  optionTypePublication:Array<string>;
  showMagazine: boolean;
  msjErroContentTable: string;
  showErrorContentTable: boolean;
  placeholderContentTable: string;
  today: Date;
  max_date: string;
  showErrorDateApproved: boolean;
  msjErrorDateApproved: string;
  showErrorDatePublication: boolean;
  msjErrorDatePublication: string;

  /***********************VARIABLES DE INSTANCIA************* */
  fileToContentTable = null;
  fieldsForm: FormGroup;

  constructor(private publicationsService: PublicationService, private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.titleFormAddMagazine = 'Datos Para la Revista';
    this.subtitleFormAddMagazine = 'En este formulario ingrese los datos para la revista, recuerde los campos con * son obligatorios.'
                                  +' No olvide cargar los archivos necesarios';
    this.nameBtnAddMagazine = 'Registrar Revista';
    this.optionTypePublication= ['Elija el tipo de publicacion', this.MAGAZINE, 'Evento', 'Libro', 'Capitulo Libro'];
    this.msjErroContentTable = '';
    this.msjErrorDateApproved = '';
    this.msjErrorDatePublication = '';
    this.placeholderContentTable ='Seleccione un archivo PDF que contenga la tabla de contenido';
    this.showMagazine = false;
    this.showErrorContentTable = false;
    this.showErrorDateApproved = false;
    this.showErrorDatePublication = false;
    this.today = new Date();
    this.setMaxDate();
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
      });
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
      }
    }
    else{
      this.msjErroContentTable= 'Solo se permiten archivos PDF';
      this.showErrorContentTable = true;
    }
  }

  handleTypePublication(event: any)
  {
    if(event.target.value == this.MAGAZINE)
    {
      if(this.verifySelectDates())
      {
        this.showMagazine = true;
        this.verifySelectDates();
      }
    }
    else{
      this.showMagazine = false;
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
    }
  }


  getDataMagazine(dateMagazine: {doi: string, title: string, name: string, category: string, filePDFArticle: File,
                  fileScreenShotEmail: File, fileScreenshotClasification: File })
  {
    console.log(dateMagazine.filePDFArticle.name);
  }

}
