import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationsComponent } from './add-publications/add-publications.component';
import { PublicationRoutingModule } from './publications.routing';
import { PublicationService } from './publications.service';
import { SeekersModule } from '../seekers/seekers.module';
import { AddMagazineComponent } from './magazine/add-magazine/add-magazine.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookFormComponent } from './book/book-form/book-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicationRoutingModule,
    SeekersModule
  ],
  declarations: [AddPublicationsComponent, AddMagazineComponent, BookFormComponent],
  providers: [PublicationService]
})
export class PublicationModule { }
