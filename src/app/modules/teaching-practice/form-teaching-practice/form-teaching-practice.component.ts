import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { StringValidation } from '../../../resources/stringValidation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilitiesDate } from '../../../models/utilities/utilitiesDate';
import { TeachingPracticeService } from '../teachingPractice.service';
import { Router } from '@angular/router';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';

const TAM_MAX_FILE: number = 10240;
const PLACEHOLDER_CERTIFICATE: string= 'Archivo PDF, PNG o JPG que contenga el certificado del evento';
const teachingCoursePre: string = 'Docencia curso pregrado';
const teachingCoursePos: string = 'Docencia curso posgrado';
const shortCourse: string = 'Curso corto (seminario actualizacion)';
const monitoria: string = 'Monitorías cursos';
const gradeWorkDirection: string = 'Direccion de Trabajo de Grado en pregrado/posgrado';
const consultingBusinessInternship: string = 'Asesoria de pasantía empresarial';
const participationIntheProgramCommittee: string = 'Participacion en el Comite de Programa';
const otherActivities: string = 'Otras actividades de apoyo al departamento';

@Component({
  selector: 'app-form-teaching-practice',
  templateUrl: './form-teaching-practice.component.html'
})
export class FormTeachingPracticeComponent implements OnInit {

   /*************************STRINGS APP********************* */
   stringValidation: StringValidation;
  /***********************VARIABLES LOCALES**************** */
  @Input() titleForm: {titleForm: string};
  @Input() subtitleForm: {subtitleForm: string};
  @Input() buttonAction: {buttonAction: string};
  @ViewChild('categoryTypePractice') cbx_typePractice: any;
  optionsTypeTeachingPractice: Array<string>;
  showDatesStartAndEnd: boolean;
  showErrorDateFinish: boolean;
  showErrorCertificate: boolean;
  showErrorDateStart: boolean;
  nameStudent: string;
  codeStudent: string;
  msjErrorDateFinish: string;
  msjErrorCertificate: string;
  msjErrorDateStart: string;
  placeholderCertificate: string;
  dataStart: string;
  dateEnd: string;
  max_date: string;
   /************************VARIABLES DE INSTANCIA********** */
   @Output() getDataTeachingP = new EventEmitter<{teachingPractice: TeachingPractice}>();
   fileToCertificate: null;
   fieldsForm: FormGroup;
   utilitiesDate: UtilitiesDate;
   teachingP: TeachingPractice;

  constructor(private formBuilder: FormBuilder, private teachingPracticeService: TeachingPracticeService, private router: Router)
  {
    this.utilitiesDate = new UtilitiesDate();
    this.teachingP = new TeachingPractice();
    this.optionsTypeTeachingPractice = ['Diseno curricular de curso teorico/practico nuevos - pregrado',
                                        'Diseño curricular de curso teorico/practico nuevos - posgrado',
                                        'Preparacion de cursos teoricos/practicos nuevos – pregrado',
                                        'Preparacion de cursos teoricos/practicos nuevos – posgrado',
                                        teachingCoursePre, teachingCoursePos, shortCourse, monitoria,
                                        'Elaboracion de material de apoyo para Pregrado/ Posgrado',
                                        gradeWorkDirection, 'Jurado trabajo de grado de pregrado',
                                        'Jurado Anteproyecto de Maestría', 'Jurado Trabajo de Grado de Maestria',
                                        consultingBusinessInternship, 'Evaluacion como jurado de pasantia empresarial',
                                        'Evaluacion de plan de trabajo para pasantia empresarial', 'Evaluacion de anteproyecto-pregrado',
                                        'Evaluacion productividad intelectual', 'Evaluación informe ano sabatico - Libros',
                                        participationIntheProgramCommittee, otherActivities];
    this.showDatesStartAndEnd = false;
    this.showErrorDateFinish = false;
    this.showErrorCertificate = false;
    this.showErrorDateStart = false;
    this.msjErrorDateStart = '';
    this.msjErrorDateFinish = '';
    this.msjErrorCertificate = '';
    this.dataStart ='';
    this.dateEnd = '';
    this.placeholderCertificate = PLACEHOLDER_CERTIFICATE;
    this.max_date = this.utilitiesDate.getMaxDate();
  }

  getStudent()
  {
    this.teachingPracticeService.getStudent()
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
        dateActivityStart:  [''],
        dateActivityEnd:  [''],
      });
      this.getStudent();
  }

  handleDateFinish(event: any)
  {
    const dateEnd = this.fieldsForm.get('dateActivityEnd').value;
    const dateStart = this.fieldsForm.get('dateActivityStart').value;
    if (dateEnd < dateStart)
    {
      this.showErrorDateFinish = true;
      this.msjErrorDateFinish = 'La fecha de finalizacion no puede ser menor que la fecha de inicio';
    }
    else{
      this.dataStart = dateStart;
      this.dateEnd = dateEnd;
      this.showErrorDateFinish = false;
      this.showErrorDateStart = false;
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

  handleTypePractice(event: any)
  {
    const valueOptionTypePublication = this.cbx_typePractice.nativeElement.value;
    this.showDatesStartAndEnd = this.veryIfItemSelectedHaveDates(valueOptionTypePublication);
  }

  veryIfItemSelectedHaveDates(item: string): boolean
  {
    if((item === teachingCoursePos) || (item === teachingCoursePre) || (item === shortCourse) || (item === monitoria) ||
       (item === gradeWorkDirection) || (item === consultingBusinessInternship) || (item === participationIntheProgramCommittee) ||
       (item == otherActivities))
       {
         return true;
       }
       else{
         return false;
       }
  }

  verifyContentCertificate(): boolean
  {
    if(this.placeholderCertificate == PLACEHOLDER_CERTIFICATE)
    {
      this.showErrorCertificate= true;
      this.msjErrorCertificate = 'Este campo es obligatorio';
      return false;
    }
    else{
      return true;
    }
  }

  verifyDates(): boolean
  {
    if(this.showErrorDateFinish)
    {
      return false;
    }
    else{
      return true;
    }
  }

  onSubmit()
  {
    if(this.verifyContentCertificate())
    {
      if(this.showDatesStartAndEnd)
      {
        const dateEnd = this.fieldsForm.get('dateActivityEnd').value;
        const dateStart = this.fieldsForm.get('dateActivityStart').value;
        if(dateEnd.length === 0)
        {
          this.showErrorDateFinish = true;
          this.msjErrorDateFinish = 'Campo Obligatorio para este tipo de practica';
        }
        else if(dateStart.length === 0)
        {
          this.showErrorDateStart = true;
          this.msjErrorDateStart = 'Campo Obligatorio para este tipo de practica';
        }
        else{
          this.getDataTeachingPractice();
        }
      }
      else{
        this.getDataTeachingPractice();
      }
    }
  }

  getDates()
  {
    const valueOptionTypePublication = this.cbx_typePractice.nativeElement.value;
    if(this.veryIfItemSelectedHaveDates(valueOptionTypePublication))
    {
      this.dataStart = this.fieldsForm.get('dateActivityStart').value;
      this.dateEnd = this.fieldsForm.get('dateActivityEnd').value;
    }
    else{
      this.dataStart = '';
      this.dateEnd = '';
    }
  }
  getDataTeachingPractice()
  {
    this.getDates();
    this.teachingP.setNameStudent(this.nameStudent);
    this.teachingP.setCodeStudent(this.codeStudent);
    this.teachingP.setDateEnd(this.dateEnd);
    this.teachingP.setDateStart(this.dataStart);
    this.teachingP.setCertificatePractice(this.fileToCertificate);
    this.teachingP.setTypePractice(this.cbx_typePractice.nativeElement.value);
    this.getDataTeachingP.emit({teachingPractice: this.teachingP});
  }

}
