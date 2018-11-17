import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternshipRoutingModule } from './internshipRouting';
import { InternshipService } from './intership.service.service';
import { FormInternshipComponent } from './form-internship/form-internship.component';
import { AddInternshipComponent } from './add-internship/add-internship.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    InternshipRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  declarations: [FormInternshipComponent, AddInternshipComponent],
  providers: [InternshipService]
})
export class InternshipModule { }
