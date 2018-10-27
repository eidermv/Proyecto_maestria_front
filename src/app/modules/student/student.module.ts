import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StudentRoutingModule } from './student.routing';
import { FormStudentComponent } from './form-student/form-student.component';
import { StudentService } from './student.service';

@NgModule({
  imports:
            [
            StudentRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            CommonModule,
            ModalModule.forRoot(),
            ],
  providers:[StudentService],
  declarations: [AddStudentComponent, FormStudentComponent]
})
export class StudentModule { }
