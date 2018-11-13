import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationsComponent } from './add-publications/add-publications.component';
import { PublicationRoutingModule } from './publications.routing';
import { PublicationService } from './publications.service';
import { SeekersModule } from '../seekers/seekers.module';
import { AddMagazineComponent } from './magazine/add-magazine/add-magazine.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookFormComponent } from './book/book-form/book-form.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { CapBookFormComponent } from './capBook/cap-book-form/cap-book-form.component';
import { AddCapBookComponent } from './capBook/add-cap-book/add-cap-book.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ListPublicationForStudentComponent } from './list-publication-for-student/list-publication-for-student.component';
import { ListPublicationForAdminComponent } from './list-publication-for-admin/list-publication-for-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowPublicationComponent } from './show-publication/show-publication.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicationRoutingModule,
    SeekersModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  declarations: [AddPublicationsComponent,
                  AddMagazineComponent, BookFormComponent,
                  AddBookComponent, CapBookFormComponent,
                  AddCapBookComponent,
                  EventFormComponent,
                  AddEventComponent,
                  ListPublicationForStudentComponent,
                  ListPublicationForAdminComponent,
                  ShowPublicationComponent],
  providers: [PublicationService]
})
export class PublicationModule { }
