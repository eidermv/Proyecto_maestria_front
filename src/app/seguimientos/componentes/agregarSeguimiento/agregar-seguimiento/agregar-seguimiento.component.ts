import { Component, OnInit } from '@angular/core';
import { debounceTime, debounce, startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder,Validators } from '@angular/forms';
import { Seguimiento } from '../../../modelos/seguimiento.model';
import { Observable } from 'rxjs/internal/Observable';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TutorService } from '../../../servicios/tutor.service';
@Component({
  selector: 'app-agregar-seguimiento',
  templateUrl: './agregar-seguimiento.component.html',
  styleUrls: ['./agregar-seguimiento.component.css']
})
export class AgregarSeguimientoComponent implements OnInit {
  formulario: FormGroup;
  options:Tutor[]=[];  
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  constructor(private formBuilder: FormBuilder, private tutorService:TutorService) {
    this.tutorService.onTutores();
   }
  ngOnInit(): void {
    this.options=this.tutorService.tutores; 
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
                              Validators.maxLength(50)]
                         ],
        tipo:  ['', [Validators.required]],
        tutor:  ['', [Validators.required]],
        estudiante:  ['', [Validators.required]],
      }); 
      console.log("Lista filtro: ",this.filteredOptions);
    this.filteredOptions = this.myControl.valueChanges.pipe(debounceTime(350),
      startWith(''),
      map(value => this._filter(value).map(v2=>v2.nombre))
    ); 
      /* this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{
            console.log(value);            
          }
        );
        
     */
  }
  private _filter(value: string): Tutor[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      if(option.nombre.toLowerCase().indexOf(filterValue) === 0)
      {
        return option
      }     
      });
  }
  listar(event)
  {

  }
  getNombreField()
  {
    this.formulario.get('nombre');
  }
  getTipoField()
  {
    this.formulario.get('tipo');
  }
  getTutorField()
  {
    this.formulario.get('tutor');
  }
  getEstudianteField()
  {
    this.formulario.get('estudiante');
  }

  onSubmit(event:Event) 
  {
    
    event.preventDefault(); 
    console.log("COMPROBANDO");
    if(this.formulario.valid)
    {
      const value= this.formulario.value;
      console.log(value);  
    }
    else {this.formulario.markAllAsTouched();
    //this.errorFormulario();
    }
  }
  errorFormulario()
  {
    Swal.fire({
      title: 'Campos sin Llenar',
      allowOutsideClick: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }, 
        confirmButtonText: 'Ok',
        reverseButtons: true,
      confirmButtonColor: '#3085d6',
  });
  }
 crearTutor()
  {
    /* console.log("ROW OBTENIDA:  ",row); */
    Swal.fire({
      title: 'CREAR TUTOR',
      allowOutsideClick: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      html:
      '<div class="card col-lg-12 col-md-12 col-sm-12 col-xs-12">'+'<br>'+'<br>'+
      '<div class="row">' +
      '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
      '  <span class="input-group-text col-lg-6 col-md-6 col-sm-5 col-xs-6">Nombres:</span>' +
      '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text" id="nombres">' +
      '</div>'+
      '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
        '  <span class="input-group-text col-lg-6 col-md-5 col-sm-6 col-xs-6">Apellidos:</span>' +
        '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text" id="apellidos">' +
        '</div>'+
        '</div>\n'+'<br>'+
        '<div class="row">' +
        '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
        '  <span class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6">Identificación:</span>' +
        '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text" id="identificación">' +
        '</div>'+
        '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
          '  <span class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6">Telefono:</span>' +
          '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text"  id="telefono">' +
          '</div>'+
          '</div>\n'+'<br>'+
          '<div class="row">' +
        '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
        '  <span class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6">Direccion:</span>' +
        '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text" id="direccion">' +
        '</div>'+
        '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
          '  <span class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6">Correo:</span>' +
          '  <input class="col-lg-6 col-md-6 col-sm-6 col-xs-6" type="text"  id="correo">' +
          '</div>'+
          '</div>\n'+'<br>'+
          
          '<div class="row">' +
        '    <div class="input-group-prepend col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
        '      <span class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6">Tipo:</span>' +
        '      <select class="input-group-text col-lg-6 col-md-6 col-sm-6 col-xs-6" id="tipo">' +
        '        <option class="col-lg-6 col-md-6 col-sm-6 col-xs-6" selected value="1">Interno</option> '+
        '        <option class="col-lg-6 col-md-6 col-sm-6 col-xs-6" value="2">Externo</option> '+
        '  </div>'+
        '</div>'+    
          '</div>\n' + '<br>'+'<br>'
        
        , 
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      confirmButtonColor: '#3085d6',
       preConfirm: () => {
        /*  this.ejemploService.consulta.next(Number((document.getElementById('nombre') as HTMLInputElement).value));
         */
        let nombre = (document.getElementById('nombres') as HTMLInputElement).value;
        let apellido = (document.getElementById('apellidos') as HTMLInputElement).value;
        let identificación = (document.getElementById('identificación') as HTMLInputElement).value;
        let tipo = (document.getElementById('tipo') as HTMLSelectElement).options[(document.getElementById('tipo') as HTMLSelectElement).selectedIndex].value;
        let bandNombre=true; let bandApellido=true; let bandidentificación=true; let bandTipo=true;
        if (nombre === ''){
          bandNombre=false;
          (document.getElementById('nombres') as HTMLStyleElement).style.borderColor = 'red';
          Swal.showValidationMessage('Ingrese Nombres');
        } else {
          (document.getElementById('identificación') as HTMLStyleElement).style.borderColor = 'black';
         bandNombre=true;
        }
        
        
        
        if (identificación === ''){
          bandApellido=false;
          (document.getElementById('identificación') as HTMLStyleElement).style.borderColor = 'red';
          Swal.showValidationMessage('Ingrese identificación');
        } else {
          bandApellido=true;
          (document.getElementById('identificación') as HTMLStyleElement).style.borderColor = 'black';
        }
        console.log("TIPO:    ",tipo);
        if (tipo === '1'){
          bandTipo=false;
          (document.getElementById('tipo') as HTMLStyleElement).style.borderColor = 'red';
          Swal.showValidationMessage('Selecciona Tipo');
        } else {
          bandTipo=true;
          (document.getElementById('tipo') as HTMLStyleElement).style.borderColor = 'black';          
        }
        if(bandNombre&&bandApellido&&bandidentificación&&bandTipo)
        return [
          nombre
        ];
        
      }  
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            title: 'Tutor creado!',
          text: 'El Tutor ha sido Creado.' /* + JSON.stringify(result) */,
          icon: 'success',
          timer: 2500}
        );
      } else if (
        /* Read more about handling dismissals below */
        result.isDismissed
      ) {
        Swal.fire(
          'Cancelado',
          'El tutor No se Creó',
          'error'
        );
      }
  });
}

}
