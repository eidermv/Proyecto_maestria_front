import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternshipRoutingModule } from './internshipRouting';
import { InternshipService } from './intership.service.service';
import { FormInternshipComponent } from './form-internship/form-internship.component';
import { AddInternshipComponent } from './add-internship/add-internship.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ListInternshipForAdminComponent } from './list-internship-for-admin/list-internship-for-admin.component';
import { ListInternshipForStudentComponent } from './list-internship-for-student/list-internship-for-student.component';
import { ShowInternshipComponent } from './show-internship/show-internship.component';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';

@NgModule({
  imports: [
    CommonModule,
    InternshipRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    ModalWindowsModule
  ],
  declarations: [FormInternshipComponent, AddInternshipComponent, ListInternshipForAdminComponent,
                 ListInternshipForStudentComponent, ShowInternshipComponent],
  providers: [InternshipService]
})
export class InternshipModule { }
