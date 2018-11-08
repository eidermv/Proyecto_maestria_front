import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StringValidation } from '../../../../resources/stringValidation';

@Component({
  selector: 'app-cap-book-form',
  templateUrl: './cap-book-form.component.html'
})
export class CapBookFormComponent implements OnInit {

   /****************************VARIABLE GLOBALE********** */
   public TAM_MAX_FILE: number = 10240;
   /*************************STRINGS APP********************* */
    stringValidation: StringValidation;
    /***********************VARIABLES LOCALES**************** */
    @Input() resetForm: {resetForm: string};
    @Input() titleForm: {titleForm: string};
    @Input() subtitleForm: {subtitleForm: string};
    @Input() buttonAction: {buttonAction: string};
    placeholderCapBook: string;
    placeholderCertificate: string;
    msjErroBook: string;
    msjErrorCertificate: string;
    showErrorCapBook: boolean;
    showErrorCertificate: boolean;
   /************************VARIABLES DE INSTANCIA********** */
   @Output() getDateCapBook = new EventEmitter<{isbn: string, title: string, editorial: string, titleCapLibro: string
    fileBook: File, fileCertificate: File}>();
  fieldsForm: FormGroup;
  fileToBook: null;
  fileToCertificate: null;
  constructor(private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.placeholderCapBook = 'Seleccione un archivo PDF que contenga el capitulo del libro';
    this.placeholderCertificate = 'Seleccione un archivo PDF, JPG o PNG que contenga el Certificado';
    this.showErrorCapBook = false;
    this.showErrorCertificate = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        isbnBook:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_ISBN),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        ]
                    ],
        tittleBook:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_BOOK),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                ],
        editorial:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_EDITORIAL),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
        capTitleBook: ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_CAP_BOOK),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
    });
  }
  handleFileInpuCapBook(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'pdf')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErroBook = 'El archivo supera el limite de 10 MB';
        this.showErrorCapBook = true;
      }
      else{
        this.fileToBook = event.target.files[0];
        this.placeholderCapBook = event.target.files[0].name;
        this.showErrorCapBook = false;
      }
    }
    else{
      this.msjErroBook = 'Solo se permiten archivos PDF';
      this.showErrorCapBook = true;
    }
  }

  handleFileInputCertificate(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'png' || type_file[1] == 'jpeg' || type_file[1] == 'pdf')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErrorCertificate= 'El archivo supera el limite de 10 MB';
        this.showErrorCertificate = true;
      }
      else{
        this.fileToCertificate = event.target.files[0];
        this.placeholderCertificate = event.target.files[0].name;
        this.showErrorCertificate = false;
      }
    }
    else{
      this.msjErrorCertificate = 'Solo se permiten archivos PNG, JPG o PDF';
      this.showErrorCertificate = true;
    }
  }

  onSubmit()
  {
    if(this.fileToBook == null)
    {
      this.showErrorCapBook = true;
      this.msjErroBook = 'Debe cargar un PDF del capitulo del libro';
    }
    else if(this.fileToCertificate == null)
    {
      this.showErrorCertificate = true;
      this.msjErrorCertificate = 'Debe cargar una imagen PDF, PNG o JPG que muestre el certificado de la editorial';
    }
    else{
      this.showErrorCapBook = false;
      this.showErrorCertificate = false;
      this.getDatePublicationCapBook();
    }
  }

  getDatePublicationCapBook()
  {
    this.getDateCapBook.emit(
                              {
                                isbn: this.fieldsForm.get('isbnBook').value,
                                title: this.fieldsForm.get('tittleBook').value,
                                editorial: this.fieldsForm.get('editorial').value,
                                titleCapLibro: this.fieldsForm.get('capTitleBook').value,
                                fileBook: this.fileToBook,
                                fileCertificate: this.fileToCertificate,
                              }
                            );
  }

}
