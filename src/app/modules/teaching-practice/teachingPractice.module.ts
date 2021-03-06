import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination';
import { AddTeachingPracticeComponent } from './add-teaching-practice/add-teaching-practice.component';
import { FormTeachingPracticeComponent } from './form-teaching-practice/form-teaching-practice.component';
import { TeachingPracticeRoutingModule } from './teachingPractice.routing';
import { TeachingPracticeService } from './teachingPractice.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { ListTeachingPracticeForStudentComponent } from './list-teaching-practice-for-student/list-teaching-practice-for-student.component';
import { ListTeachingPracticeForAdminComponent } from './list-teaching-practice-for-admin/list-teaching-practice-for-admin.component';
import { ShowTeachingPracticeComponent } from './show-teaching-practice/show-teaching-practice.component';
import { TeachingPracticeFilterPipe } from './list-teaching-practice-for-admin/teachingPracticeFilter.pipe';
import { ShowHoursAndCreditsForStudentComponent } from './show-hours-and-credits-for-student/show-hours-and-credits-for-student.component';
import { SeekersModule } from '../seekers/seekers.module';

@NgModule({
  imports: [
    TeachingPracticeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    SeekersModule,
    ModalModule.forRoot(),
    ModalWindowsModule
  ],
  declarations: [
    AddTeachingPracticeComponent,
    FormTeachingPracticeComponent,
    ListTeachingPracticeForStudentComponent,
    ListTeachingPracticeForAdminComponent,
    ShowTeachingPracticeComponent,
    TeachingPracticeFilterPipe,
    ShowHoursAndCreditsForStudentComponent],
    providers: [TeachingPracticeService]
})
export class TeachingPracticeModule { }
