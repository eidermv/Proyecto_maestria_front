import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SeekersService } from '../seekers.service';
import { StringValidation } from '../../../resources/stringValidation';
import { Localization } from '../../../models/localization';



@Component({
  selector: 'app-citys-and-countries',
  templateUrl: './citys-and-countries.component.html'
})
export class CitysAndCountriesComponent implements OnInit {
  /*************************STRINGS APP********************* */
  stringValidation: StringValidation;

   /***********************VARIABLES LOCALES *****************/
   @Output() getLocalization = new EventEmitter<{city: string, country: string}>();
   @Input() resetForm: {resetForm: string};
   @ViewChild('f') form: NgForm ;
   options = [];
   cityNotFound: boolean;
    fieldCityEmpty: boolean;
    txt_fieldSearchToCity: string;
    arrayCitys: Array<string>;
    /****************VARIABLES DE INSTANCIA********** */
    fieldsForm: FormGroup;
    localization: Localization;

  constructor(private formBuilder: FormBuilder, private seekersServices: SeekersService) {
    this.stringValidation = new StringValidation();
    this.localization = new Localization();
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

  ressetForm() {
    this.form.reset();
    this.clearOptions();
  }
  clearOptions() {
    this.options = [];
  }

  determineAction(eventField: any) {
    this.fieldCityEmpty = false;
      if ((eventField.key === 'Enter') || (eventField.type === 'click')) {
          this.getDataCity();
        } else {
          this.searchLocation();
        }
  }

  private searchLocation() {
    this.txt_fieldSearchToCity = this.fieldsForm.get('nameCity').value;
    if (this.txt_fieldSearchToCity.length === 0) {
        this.fieldCityEmpty = true;
        this.clearOptions();
    } else {
      this.seekersServices.searchCity(this.txt_fieldSearchToCity).
      subscribe(data => {
          this.proccessResponse( data);
        },
        err => {
          this.clearOptions();
          this.fieldCityEmpty = true;
        }
      );
    }
  }
  private proccessResponse(data: Array<any>) {
    this.arrayCitys = data['geonames'];
    if (this.arrayCitys.length > 0) {
      this.loadOptions(this.arrayCitys);
      this.cityNotFound = false;
      } else {
        this.clearOptions();
        this.cityNotFound = true;
      }
  }

  private loadOptions(citys: Array<string>) {
    this.clearOptions();
    for (let i = 0 ; i < citys.length ; i++) {
        this.options.push(citys[i]['name'] + '-' + citys[i]['countryName']);
      }
  }

  getDataCity() {
    if (this.checkSelectedStudentValid()) {
      this.selectedCity();
      this.getLocalization.emit(
                                {
                                  city: this.reemplazarVocales(this.localization.getCity()),
                                  country: this.reemplazarVocales(this.localization.getCountry()),
                                }
                               );
    }
  }

  reemplazarVocales(str: string) {
    str = str.replace('á', 'a');
    str = str.replace('é', 'e');
    str = str.replace('í', 'i');
    str = str.replace('ó', 'o');
    str = str.replace('ú', 'u');
    str = str.replace('Á', 'A');
    str = str.replace('É', 'E');
    str = str.replace('Í', 'I');
    str = str.replace('Ó', 'O');
    str = str.replace('Ú', 'U');
    str = str.replace('Å', 'A');
    str = str.replace('å', 'a');
    return str;
    }

  checkSelectedStudentValid() {
    return this.options.includes(this.fieldsForm.get('nameCity').value.trim());
  }

  selectedCity() {
    for (let i = 0 ; i < this.arrayCitys.length ; i++) {
      const citySelected = this.fieldsForm.get('nameCity').value.split('-');
      if (this.arrayCitys[i]['name'].includes(
        citySelected[0].trim()) && this.arrayCitys[i]['countryName'].includes(citySelected[1].trim())) {
        this.localization.setCity(this.arrayCitys[i]['name']);
        this.localization.setCountry(this.arrayCitys[i]['countryName']);
      }
    }
  }
}
