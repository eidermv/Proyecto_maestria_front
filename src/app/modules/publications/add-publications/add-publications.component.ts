import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../publications.service';

@Component({
  selector: 'app-add-publications',
  templateUrl: './add-publications.component.html'
})
export class AddPublicationsComponent implements OnInit {

  /*************************VARIABLES LOCALES**************** */
  fileToSend: null;

  constructor(private publicationsService: PublicationService)
  {

  }

  ngOnInit() {
  }

  handleFileInput(event: any)
  {
    this.fileToSend = event.target.files[0];

  }

  sendFile()
  {
    this.publicationsService.sentFile(this.fileToSend)
    .subscribe(data =>
      {
        console.log('lo envie');
      },
      err =>
      {
        console.log('no lo envie');
      });
  }

}
