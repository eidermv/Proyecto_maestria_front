import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StudentRoutingModule } from './student.routing';
import { FormStudentComponent } from './form-student/form-student.component';
import { StudentService } from './student.service';
import { ListStudentComponent } from './list-student/list-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SeekersModule } from '../seekers/seekers.module';
import { NgxPaginationModule} from 'ngx-pagination';
import { StudentFilterPipe } from './list-student/studentFilter.pipe';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';


@NgModule({
  imports:
            [
            StudentRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            CommonModule,
            ModalModule.forRoot(),
            SeekersModule,
            NgxPaginationModule,
            ModalWindowsModule
            ],
  providers: [StudentService],
  declarations: [AddStudentComponent,
                FormStudentComponent,
                ListStudentComponent,
                EditStudentComponent,
                StudentFilterPipe]
})
export class StudentModule { }
