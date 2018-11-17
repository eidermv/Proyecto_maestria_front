import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination';
import { AddTeachingPracticeComponent } from './add-teaching-practice/add-teaching-practice.component';
import { FormTeachingPracticeComponent } from './form-teaching-practice/form-teaching-practice.component'
import { TeachingPracticeRoutingModule } from './teachingPractice.routing';
import { TeachingPracticeService } from './teachingPractice.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    TeachingPracticeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    AddTeachingPracticeComponent,
    FormTeachingPracticeComponent],
    providers: [TeachingPracticeService]
})
export class TeachingPracticeModule { }
