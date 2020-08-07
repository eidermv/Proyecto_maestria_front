import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StringValidation } from '../../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  /****************************VARIABLE GLOBALE********** */
  public TAM_MAX_FILE = 10240;
 /*************************STRINGS APP********************* */
  stringValidation: StringValidation;
  /***********************VARIABLES LOCALES**************** */
  @Input() resetForm: {resetForm: string};
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  placeholderBook: string;
  placeholderCertificate: string;
  msjErroBook: string;
  msjErrorCertificate: string;
  msjErrorLocalization: string;
  showErrorBook: boolean;
  showErrorCertificate: boolean;
  showErrorLocalization: boolean;
  city: string;
  contry: string;
  /************************VARIABLES DE INSTANCIA********** */
  @Output() getDateBook = new EventEmitter<{isbn: string, title: string, editorial: string, city: string, country: string
    fileBook: File, fileCertificate: File}>();
  fieldsForm: FormGroup;
  fileToBook: null;
  fileToCertificate: null;


  constructor(private formBuilder: FormBuilder) {
    this.stringValidation = new StringValidation();
    this.placeholderBook = 'Archivo PDF que contenga el Libro';
    this.placeholderCertificate = 'Archivo PDF, JPG o PNG que contenga el Certificado';
    this.city = '';
    this.contry = '';
    this.showErrorBook = false;
    this.showErrorCertificate = false;
    this.showErrorLocalization = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        isbnBook:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_ISBN),
                          Validators.pattern('^[0-9]+(-[0-9]+)+$'),
                        ]
                    ],
        tittleBook:  ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_BOOK),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                ],
        editorial:  ['', [Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_EDITORIAL),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
    });
  }

  handleFileInputBook(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if (type_file[1] === 'pdf') {
      if (tam_file > this.TAM_MAX_FILE) {
        this.msjErroBook = 'El archivo supera el límite de 10 MB';
        this.showErrorBook = true;
      } else {
        this.fileToBook = event.target.files[0];
        this.placeholderBook = event.target.files[0].name;
        this.showErrorBook = false;
      }
    } else {
      this.msjErroBook = 'Solo se permiten archivos PDF';
      this.showErrorBook = true;
    }
  }

  handleFileInputCertificate(event: any) {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if (type_file[1] === 'png' || type_file[1] === 'jpeg' || type_file[1] === 'pdf') {
      if (tam_file > this.TAM_MAX_FILE) {
        this.msjErrorCertificate = 'El archivo supera el límite de 10 MB';
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

  onSubmit() {
    if (this.fileToBook === null) {
      this.showErrorBook = true;
      this.msjErroBook = 'Debe cargar un PDF para la el libro';
    } else if (this.fileToCertificate === null) {
      this.showErrorCertificate = true;
      this.msjErrorCertificate = 'Debe cargar una imagen PDF, PNG o JPG que muestre el certificado de la editorial';
    } else if (this.city.length === 0 || this.contry.length === 0) {
      this.showErrorLocalization = true;
      this.msjErrorLocalization = 'Debe de seleccionar una ciudad';
    } else {
      this.showErrorLocalization = false;
      this.showErrorBook = false;
      this.showErrorCertificate = false;
      this.getDatePublicationBook();
    }
  }

  getLocalization(localization: {city: string, country: string}) {
    this.city = localization.city;
    this.contry = localization.country;
  }

  getDatePublicationBook() {
    this.getDateBook.emit(
                          {
                            isbn: this.fieldsForm.get('isbnBook').value,
                            title: this.fieldsForm.get('tittleBook').value,
                            editorial: this.fieldsForm.get('editorial').value,
                            city: this.city,
                            country: this.contry,
                            fileBook: this.fileToBook,
                            fileCertificate: this.fileToCertificate
                          }
                         );
  }

}
