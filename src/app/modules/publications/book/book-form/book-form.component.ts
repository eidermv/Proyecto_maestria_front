import { Component, OnInit, Input } from '@angular/core';
import { StringValidation } from '../../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
 /*************************STRINGS APP********************* */
  stringValidation: StringValidation;
  /***********************VARIABLES LOCALES**************** */
  @Input() resetForm: {resetForm: string};
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  /************************VARIABLES DE INSTANCIA********** */
  fieldsForm: FormGroup;


  constructor(private formBuilder: FormBuilder)
  {
    this.stringValidation = new StringValidation();
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        isbnBook:    ['', [Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_DOI),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                        ]
                    ],
        tittleBook:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_TITLE_ARTICLE),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                ],
        editorial:  ['',[Validators.required,
                        Validators.maxLength(this.stringValidation.MAX_LONG_NAME_MAGAZINE),
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                        ]
                      ],
        localization:  ['',[Validators.required,
          Validators.maxLength(this.stringValidation.MAX_LONG_NAME_MAGAZINE),
          Validators.minLength(this.stringValidation.MIN_LONG_TEX)
          ]
        ],
    });
  }

  onSubmit()
  {

  }

}
