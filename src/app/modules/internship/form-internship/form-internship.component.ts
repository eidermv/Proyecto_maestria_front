import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternshipService } from '../intership.service.service';
import { UtilitiesDate } from '../../../models/utilities/utilitiesDate';
import { Router } from '@angular/router';
import { Internship } from '../../../models/internship/internship';

/**************************VARIABLES GLOBALES******************/
const TAM_MAX_FILE: number = 10240;

@Component({
  selector: 'app-form-internship',
  templateUrl: './form-internship.component.html'
})
export class FormInternshipComponent implements OnInit {
   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;
  /***********************VARIABLES LOCALES**************** */
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  @ViewChild('categoryTypeInternship') cbx_typeInternship: any;
  @ViewChild('categoryTypeDependence') cbx_typeDependence: any;
  optionTypeInternship: Array<string>;
  optionDependence: Array<string>;
  nameStudent: string;
  codeStudent: string;
  max_date: string;
  dataStart: string;
  dateEnd: string;
  msjErrorDateFinish: string;
  msjErrorDateStart: string;
  msjErroReport: string;
  msjErrorCertificate: string;
  placeholderReport: string;
  placeholderCertificate: string;
  showErrorDateFinish: boolean;
  showErrorDateStart: boolean;
  showErrorReport: boolean;
  showErrorCertificate: boolean;

/************************VARIABLES DE INSTANCIA********** */
@Output() getDataInternship = new EventEmitter<{internship: Internship}>();
  utilitiesDate: UtilitiesDate;
  fieldsForm: FormGroup;
  fileToReport = null;
  fileToCertificate = null;
  internship: Internship;

  constructor(private formBuilder: FormBuilder, private internshipService: InternshipService, private router: Router)
  {
    this.utilitiesDate = new UtilitiesDate();
    this.stringValidation = new StringValidation();
    this.internship = new Internship();
    this.optionTypeInternship = ['Nacional', 'Internacional'];
    this.optionDependence = ['Departamento','Facultad','Grupo de Investigacion','Laboratorio'];
    this.dataStart = '';
    this.dateEnd = '';
    this.placeholderReport = 'Archivo PDF, JPG o PNG que contenga el Reporte del tutor';
    this.placeholderCertificate = 'Archivo PDF, JPG o PNG que contenga el certificado de pasantia';
    this.showErrorDateFinish = false;
    this.showErrorDateStart = false;
    this.showErrorReport = false;
    this.showErrorCertificate = false;
    this.max_date = this.utilitiesDate.getMaxDate();
  }

  getStudent()
  {
    this.internshipService.getStudent()
    .subscribe(data =>
      {
        this.nameStudent = data['nombres'] +' ' + data['apellidos'];
        this.codeStudent = data['codigo'];
        this.fieldsForm.get('author').setValue(this.nameStudent);
        this.fieldsForm.get('author').disable();
      },
      err=>
      {
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.fieldsForm = this.formBuilder.group(
      {
        author:['', Validators.required],
        dateInternshipStart:  ['', Validators.required],
        dateInternshipEnd:  ['', Validators.required],
        institution: ['',[Validators.required,
                          Validators.maxLength(this.stringValidation.MAX_LONG_NAME_INSTITUTION),
                          Validators.minLength(this.stringValidation.MIN_LONG_TEX)]],
        nameDependence: ['', [Validators.required,
                             Validators.maxLength(this.stringValidation.MAX_LONG_NAME_DEPENDENCE),
                             Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                             Validators.pattern('[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$')]],
        responsibleForThePractice: ['', [Validators.required,
                                        Validators.maxLength(this.stringValidation.MAX_LONG_RESPONSIBLE_FOR_THE_PRACTICE),
                                        Validators.minLength(this.stringValidation.MIN_LONG_TEX),
                                        Validators.pattern('[ A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ.-]+$')]],
      });
      this.getStudent();
  }

  handleDateFinish(event: any)
  {
    const dateEnd = this.fieldsForm.get('dateInternshipEnd').value;
    const dateStart = this.fieldsForm.get('dateInternshipStart').value;
    if (dateEnd < dateStart)
    {
      this.showErrorDateFinish = true;
      this.msjErrorDateFinish = 'La fecha de fin de pasantia no puede ser menor que la fecha de inicio';
    }
    else if (dateEnd == dateStart)
    {
      this.showErrorDateFinish = true;
      this.msjErrorDateFinish = 'La fecha de fin de la pasantia no puede ser igual que la fecha de inicio';
    }
    else{
      this.dataStart = dateStart;
      this.dateEnd = dateEnd;
      this.showErrorDateFinish = false;
      this.showErrorDateStart = false;
    }
  }

  handleFileInputReport(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'png' || type_file[1] == 'jpeg' || type_file[1] == 'pdf')
    {
      if(tam_file > TAM_MAX_FILE)
      {
        this.msjErroReport = 'El archivo supera el limite de 10 MB';
        this.showErrorReport = true;
      }
      else{
        this.fileToReport = event.target.files[0];
        this.placeholderReport = event.target.files[0].name;
        this.showErrorReport = false;
      }
    }
    else{
      this.msjErroReport = 'Solo se permiten archivos PNG, JPG o PDF';
      this.showErrorReport = true;
    }
  }

  handleFileInputCertificate(event: any)
  {
    const tam_file = event.target.files[0].size / 1024;
    const type_file = event.target.files[0].type.split('/');
    if(type_file[1] == 'png' || type_file[1] == 'jpeg' || type_file[1] == 'pdf')
    {
      if(tam_file > TAM_MAX_FILE)
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
    if(this.verifySelectDates())
    {
      if(this.fileToReport == null)
      {
        this.showErrorReport = true;
        this.msjErroReport = 'Debe cargar un PDF, PNG o JPG que muestre el reporte emitido por el tutor ';
      }
      else if(this.fileToCertificate == null)
      {
        this.showErrorCertificate = true;
        this.msjErrorCertificate = 'Debe cargar un PDF, PNG o JPG que muestre el certificado de pasantia';
      }
      else{
        this.getDataIntership();
      }
    }
  }

  verifySelectDates()
  {

    if((this.fieldsForm.get('dateInternshipStart').value.length == 0) || this.showErrorDateStart)
    {
      if(this.showErrorDateStart)
      {
        this.showErrorDateFinish = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio y presenta un error';
      }
      else{
        this.showErrorDateStart = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio';
      }
      return false;
    }
    else if((this.fieldsForm.get('dateInternshipEnd').value.length == 0) || this.showErrorDateFinish)
    {
      if( this.showErrorDateFinish)
      {
        this.showErrorDateFinish = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio y presenta un error';
      }else{
        this.showErrorDateFinish = true;
        this.msjErrorDateFinish = 'Este campo es obligatorio';
      }
      return false;
    }
    else{
      this.showErrorDateFinish = false;
      this.showErrorDateStart = false;
      return true;
    }
  }

  getDataIntership()
  {
    this.internship.setNameStudent(this.nameStudent);
    this.internship.setCodeStudent(this.codeStudent);
    this.internship.setDataIntershipStart(this.fieldsForm.get('dateInternshipStart').value);
    this.internship.setDataIntershipEnd(this.fieldsForm.get('dateInternshipEnd').value);
    this.internship.setTypeIntership(this.cbx_typeInternship.nativeElement.value);
    this.internship.setInstitution(this.fieldsForm.get('institution').value);
    this.internship.setDependence(this.cbx_typeDependence.nativeElement.value);
    this.internship.setNameDependence(this.fieldsForm.get('nameDependence').value);
    this.internship.setReportInternship(this.fileToReport);
    this.internship.setCertificateInternship(this.fileToCertificate);
    this.internship.setTutorInternship(this.fieldsForm.get('responsibleForThePractice').value);
    this.getDataInternship.emit({internship: this.internship});
  }

}
