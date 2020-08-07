import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { StringValidation } from '../../../../resources/stringValidation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesDate } from '../../../../models/utilities/utilitiesDate';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit {

  /****************************VARIABLE GLOBALE********** */
  public TAM_MAX_FILE = 10240;
  /*************************STRINGS APP********************* */
   stringValidation: StringValidation;
   /***********************VARIABLES LOCALES**************** */
   @Input() resetForm: {resetForm: string};
   @Input() titleForm: {titleForm: string};
   @Input() subtitleForm: {subtitleForm: string};
   @Input() buttonAction: {buttonAction: string};
   @ViewChild('categoryEvent') cbx_categoryEvent: any;
   optionEventType: Array<string>;

    city: string;
    contry: string;
    max_date: string;
    showErrorDateFinish: boolean;
    msjErrorDateFinish: string;
    showErrorDateStart: boolean;
    msjErrorDatePublication: string;
    showErrorPresentation: boolean;
    msjErrorPresentation: string;
    placeholderPresentation: string;
    showErrorCertificate: boolean;
    msjErrorCertificate: string;
    placeholderCertificate: string;
    msjErroBook: string;
    showErrorLocalization: boolean;
    msjErrorLocalization: string;
   /************************VARIABLES DE INSTANCIA********** */
   @Output() getDataEvent = new EventEmitter<{doi: string, issn: string, typEvent: string, city: string, country: string
    titlePresentation: string, nameEvent: string, dateStart: string, dateFinish: string, filePresentation: File, fileCertificate: File}>();
   fieldsForm: FormGroup;
   fileToCertificate: null;
   fileToPresentation: null;
   utilitiesDate: UtilitiesDate;
  constructor(private formBuilder: FormBuilder) {
    this.stringValidation = new StringValidation();
    this.utilitiesDate = new UtilitiesDate();
    this.optionEventType = ['Congreso', 'Seminario', 'Simposio'];
    this.placeholderPresentation = 'Archivo PDF que contenga la ponencia';
    this.placeholderCertificate = 'Archivo PDF, PNG o JPG que contenga el certificado del evento';
    this.showErrorLocalization = false;
    this.city = '';
    this.contry = '';
    this.showErrorDateFinish = false;
    this.showErrorDateStart = false;
    this.max_date = this.utilitiesDate.getMaxDate();
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        doiEvent:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_DOI),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                    ],
        dateStartEvent:  ['', [Validators.required]],
        dateEndEvent:  ['', [Validators.required]],
        issnEvent: ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_ISSN),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        Validators.pattern('^([0-9]{4})+([-]{1})+([0-9]{3})+([0-9X]{1})$'),
                        ]
                      ],
        tittlePresentation: ['', [Validators.required,
          Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_PRESENTATION),
          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
          ]
        ],
        nameEvent: ['', [Validators.required,
          Validators.maxLength(this.stringValidation.MAX_LONG_NAME_EVENT),
          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
          ]
        ],

    });
  }

  handleFileInputPresentation(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if (type_file[1] === 'pdf') {
      if (tam_file > this.TAM_MAX_FILE) {
        this.msjErroBook = 'El archivo supera el limite de 10 MB';
        this.showErrorPresentation = true;
      } else {
        this.fileToPresentation = event.target.files[0];
        this.placeholderPresentation = event.target.files[0].name;
        this.showErrorPresentation = false;
      }
    } else {
      this.msjErroBook = 'Solo se permiten archivos PDF';
      this.showErrorPresentation = true;
    }
  }

  handleFileInputCertificate(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if (type_file[1] === 'png' || type_file[1] === 'jpeg' || type_file[1] === 'pdf') {
      if (tam_file > this.TAM_MAX_FILE) {
        this.msjErrorCertificate = 'El archivo supera el limite de 10 MB';
        this.showErrorCertificate = true;
      } else {
        this.fileToCertificate = event.target.files[0];
        this.placeholderCertificate = event.target.files[0].name;
        this.showErrorCertificate = false;
      }
    } else {
      this.msjErrorCertificate = 'Solo se permiten archivos PNG, JPG o PDF';
      this.showErrorCertificate = true;
    }
  }

  handleDateFinish(event: any) {
    const dateEndEv = this.fieldsForm.get('dateEndEvent').value;
    const dateStartEv = this.fieldsForm.get('dateStartEvent').value;
    if (dateEndEv < dateStartEv) {
      this.showErrorDateFinish = true;
      this.msjErrorDateFinish = 'La fecha de finalizacion no puede ser menor que la fecha de inicio';
    } else if (dateEndEv === dateStartEv) {
      this.showErrorDateFinish = true;
      this.msjErrorDateFinish = 'La fecha de finalizacion no puede ser igual que la fecha de inicio';
    } else {
      this.showErrorDateFinish = false;
      this.showErrorDateStart = false;
    }
  }


  onSubmit() {
    if (this.city.length === 0 || this.contry.length === 0) {
      this.showErrorLocalization = true;
      this.msjErrorLocalization = 'Debe de seleccionar una ciudad';
    } else if (this.verifySelectDates()) {
      if (this.fileToPresentation === null) {
        this.showErrorPresentation = true;
        this.msjErrorPresentation = 'Debe cargar un PDF, PNG o JPG que muestre la ponencia';
      } else if (this.fileToCertificate === null) {
        this.showErrorCertificate = true;
        this.msjErrorCertificate = 'Debe cargar un PDF, PNG o JPG que muestre el certificado del evento';
      } else {
        this.getDataaEvent();
      }
    }
  }

  verifySelectDates() {

    if ((this.fieldsForm.get('dateStartEvent').value.length === 0) || this.showErrorDateStart) {
      if (this.showErrorDateStart) {
        this.showErrorDateFinish = true;
        this.msjErrorDatePublication = 'Este campo es obligatorio y presenta un error';
      } else {
        this.showErrorDateStart = true;
        this.msjErrorDatePublication = 'Este campo es obligatorio';
      }
      return false;
    } else if ((this.fieldsForm.get('dateEndEvent').value.length === 0) || this.showErrorDateFinish) {
      if ( this.showErrorDateFinish) {
        this.showErrorDateFinish = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio y presenta un error';
      } else {
        this.showErrorDateFinish = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio';
      }
      return false;
    } else {
      this.showErrorDateFinish = false;
      this.showErrorDateStart = false;
      return true;
    }
  }

  getLocalization(localization: {city: string, country: string}) {
    this.city = localization.city;
    this.contry = localization.country;
  }

  getDataaEvent() {
    this.getDataEvent.emit(
                            {
                              issn: this.fieldsForm.get('issnEvent').value,
                              doi: this.fieldsForm.get('doiEvent').value,
                              typEvent: this.cbx_categoryEvent.nativeElement.value,
                              city: this.city,
                              country: this.contry,
                              titlePresentation: this.fieldsForm.get('tittlePresentation').value,
                              nameEvent: this.fieldsForm.get('nameEvent').value,
                              dateStart: this.fieldsForm.get('dateStartEvent').value,
                              dateFinish: this.fieldsForm.get('dateEndEvent').value,
                              filePresentation: this.fileToPresentation,
                              fileCertificate: this.fileToCertificate,
                            }
                          );
  }

}
