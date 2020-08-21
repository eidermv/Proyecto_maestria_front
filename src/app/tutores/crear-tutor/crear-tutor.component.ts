import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tutor',
  templateUrl: './crear-tutor.component.html',
  styleUrls: ['./crear-tutor.component.css']
})
export class CrearTutorComponent implements OnInit {
  formulario: FormGroup;
  externo:boolean=false;
  constructor(public dialogoReg:MatDialogRef<CrearTutorComponent>,private formBuilder: FormBuilder) { 

    
  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        apellido: ['', [Validators.required,
          Validators.maxLength(50)]
          ],
        identificacion: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        correo: ['', [Validators.required,Validators.email]],  
        grupoInvestigacion:['',[Validators.required]],     
        departamento:['',[Validators.required]], 
        tipo: ['', [Validators.required]],
        universidad:['',[Validators.required]]
      });
      this.formulario.get('tipo').valueChanges.subscribe(
          value=>{
            if(value==2)
            {
              this.externo=true;
              this.formulario.get('universidad').setValue('');
            }
              
            else
            {
              this.externo=false;
              this.formulario.get('universidad').setValue('Universidad del Cauca');
            }
          }
        );
  }
  onSubmit(event:Event)
  {
    console.log("Guardado",event);
  }
}
