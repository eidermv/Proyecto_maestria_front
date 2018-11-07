import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPublicationsComponent } from './add-publications/add-publications.component';
import { PublicationRoutingModule } from './publications.routing';
import { PublicationService } from './publications.service';
import { SeekersModule } from '../seekers/seekers.module';

@NgModule({
  imports: [
    CommonModule,
    PublicationRoutingModule,
    SeekersModule
  ],
  declarations: [AddPublicationsComponent],
  providers: [PublicationService]
})
export class PublicationModule { }
