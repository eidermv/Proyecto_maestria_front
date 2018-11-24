import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { StringValidation } from '../../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-magazine',
  templateUrl: './add-magazine.component.html'
})
export class AddMagazineComponent implements OnInit {

  /***********************VARIABLES GLOBALES***************** */
  TAM_MAX_FILE : number = 10240;
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;
  /***********************VARIABLES LOCALES**************** */
  @Input() resetForm: {resetForm: string};
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  @ViewChild('categoryMagazine') cbx_categoryMagazine: any;
  optionCategoyMagazine: Array<string>;
  placeholderScreenShotEmail: string;
  placeholderScreenShotArticle: string;
  placeholderScreenShotClasification: string;
  msjErrorArticle: string;
  msjErrorScreenShotEmail: string;
  msjErrorScreenShotClasification: string;
  showErrorArticle: boolean;
  showErrorScreenShotEmail: boolean;
  showErrorScreenShotClasification: boolean;
  /************************VARIABLES DE INSTANCIA********** */
  @Output() getDateMagazine = new EventEmitter<{doi: string, title: string, name: string, category: string,
                                                filePDFArticle: File, fileScreenShotEmail: File, fileScreenshotClasification: File }>();
  fieldsForm: FormGroup;
  fileToArticle: null;
  fileToScreenShotEmail: null;
  fileToScreenShotClasification: null;



  constructor(private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
    this.optionCategoyMagazine = ['A1', 'A2', 'B', 'C'];
    this.placeholderScreenShotArticle = 'Archivo PDF que contenga el artículo';
    this.placeholderScreenShotClasification = 'Archivo (PNG o JPG) que contenga la clasificación de la revista';
    this.placeholderScreenShotEmail = 'Archivo (PNG o JPG) que contenga pantallazo de correo de aceptación';
    this.showErrorArticle = false;
    this.showErrorScreenShotClasification = false;
    this.showErrorScreenShotEmail = false;
  }

  ngOnInit() {

    this.fieldsForm = this.formBuilder.group(
      {
        doiMagazine:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_DOI),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX),

                        ]
                    ],
        tittleArticle:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_ARTICLE),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                ],
        nameMagazine:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_NAME_MAGAZINE),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
      });
  }

  handleFileInputArticle(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'pdf')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErrorArticle = 'El archivo supera el límite de 10 MB';
        this.showErrorArticle = true;
      }
      else{
        this.fileToArticle = event.target.files[0];
        this.placeholderScreenShotArticle = event.target.files[0].name;
        this.showErrorArticle = false;
      }
    }
    else{
      this.msjErrorArticle = 'Solo se permiten archivos PDF';
      this.showErrorArticle = true;
    }
  }

  handleFileInputScrenShotEmail(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'png' || type_file[1] == 'jpeg')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErrorScreenShotEmail= 'El archivo supera el límite de 10 MB';
        this.showErrorScreenShotEmail = true;
      }
      else{
        this.fileToScreenShotEmail = event.target.files[0];
        this.placeholderScreenShotEmail = event.target.files[0].name;
        this.showErrorScreenShotEmail = false;
      }
    }
    else{
      this.msjErrorScreenShotEmail = 'Solo se permiten archivos PNG O JPG';
      this.showErrorScreenShotEmail = true;
    }
  }

  handleFileInputScreenShotClasification(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'png' || type_file[1] == 'jpeg')
    {
      if(tam_file > this.TAM_MAX_FILE)
      {
        this.msjErrorScreenShotClasification= 'El archivo supera el límite de 10 MB';
        this.showErrorScreenShotClasification = true;
      }
      else{
        this.fileToScreenShotClasification = event.target.files[0];
        this.placeholderScreenShotClasification = event.target.files[0].name;
        this.showErrorScreenShotClasification = false;
      }
    }
    else{
      this.msjErrorScreenShotClasification = 'Solo se permiten archivos PNG O JPG';
      this.showErrorScreenShotClasification = true;
    }
  }


  onSubmit()
  {
    if(this.fileToArticle == null)
    {
      this.showErrorArticle = true;
      this.msjErrorArticle = 'Debe cargar un PDF del artículo ';
    }
    else if(this.fileToScreenShotEmail == null)
    {
      this.showErrorScreenShotEmail = true;
      this.msjErrorScreenShotEmail = 'Debe cargar una imagen PNG o JPG que muestre el correo de aceptación del artículo';
    }
    else if(this.fileToScreenShotClasification == null)
    {
      this.showErrorScreenShotClasification = true;
      this.msjErrorScreenShotClasification = 'Debe cargar una imagen PNG o JPG que muestre la categoria de la revista';
    }
    else{
      this.showErrorArticle = false;
      this.showErrorScreenShotClasification = false;
      this.showErrorScreenShotEmail = false;
      this.getDataMagazine();
    }
  }

  getDataMagazine()
  {
    this.getDateMagazine.emit({
                               doi: this.fieldsForm.get('doiMagazine').value.trim(),
                               title: this.fieldsForm.get('tittleArticle').value.trim(),
                               name: this.fieldsForm.get('nameMagazine').value.trim(),
                               category: this.cbx_categoryMagazine.nativeElement.value,
                               filePDFArticle: this.fileToArticle,
                               fileScreenShotEmail : this.fileToScreenShotEmail,
                               fileScreenshotClasification: this.fileToScreenShotClasification
                              });
  }

}
