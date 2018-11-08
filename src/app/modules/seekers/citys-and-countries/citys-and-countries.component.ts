import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SeekersService } from '../seekers.service';
import { StringValidation } from '../../../resources/stringValidation';


@Component({
  selector: 'app-citys-and-countries',
  templateUrl: './citys-and-countries.component.html'
})
export class CitysAndCountriesComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

   /***********************VARIABLES LOCALES *****************/
   @Input() resetForm: {resetForm: string};
   @ViewChild('f') form: NgForm ;
   options = [];
   cityNotFound: boolean;
    fieldCityEmpty: boolean;
    txt_fieldSearchToCity: string;
    arrayCitys: Array<string>;
    /****************VARIABLES DE INSTANCIA********** */
    fieldsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private seekersServices: SeekersService)
  {
    this.stringValidation = new StringValidation();
    this.fieldCityEmpty = false;
    this.cityNotFound = false;
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        nameCity: ['', [Validators.required,
                        Validators.minLength(this.stringValidation.MIN_LONG_TEX)
                      ]
                  ]
      });
  }

  ressetForm()
  {
    this.form.reset();
    this.clearOptions();
  }
  clearOptions()
  {
    this.options = [];
  }

  determineAction(eventField: any)
  {
    this.fieldCityEmpty = false;
      if((eventField.key === 'Enter') || (eventField.type === 'click'))
        {
          //this.getDataStudent();
        }
        else {
          this.searchLocation();
        }
  }

  private searchLocation()
  {
    this.txt_fieldSearchToCity = this.fieldsForm.get('nameCity').value;
    if(this.txt_fieldSearchToCity.length == 0)
    {
        this.fieldCityEmpty = true;
        this.clearOptions();
    }
    else{
      this.seekersServices.searchCity(this.txt_fieldSearchToCity).
      subscribe(data =>
        {
          console.log('pedi');
          //this.proccessResponse();
        },
        err =>
        {

         /* var parse = require('xml2js').parseString;
          parse(err.error.text,function (err, result)
          {
            console.log(result);
            console.log(err);
          });*/

          this.clearOptions();
          this.fieldCityEmpty = true;
        }
      );
    }
  }
  private proccessResponse(data: Array<any>)
  {
    this.arrayCitys = data;
    if(this.arrayCitys.length > 0)
      {
      this.loadOptions(this.arrayCitys);
      this.cityNotFound = false;
      }
      else
      {
        this.clearOptions();
        this.cityNotFound = true;
      }
  }

  private loadOptions(students: Array<string>)
  {
    this.clearOptions();
    for(let i = 0 ; i < students.length ; i++)
      {
        this.options.push(students[i]['nombres'] + ' ' + students[i]['apellidos']);
      }
  }

  getDataCity()
  {

  }

}
