import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges,} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-progress',
  templateUrl: './modal-progress.component.html'
})
export class ModalProgressComponent implements OnChanges{

  /**********************VARIABLE LOCALES************ */
  @ViewChild('progressModal') viewProgressRequest: any;
  @Input() urlRedirectTo: {urlRedirecTo: string};
  @Input() paramsRedirecTo: {paramsRedirecTo: string};
  @Input() evento: {evento: any};
  @Input() enableRedirect: {enableRedirect: boolean};
  progressRequest: string;
  /************************VARIABLES DE INSTANCIA********** */
  constructor( private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.proccesResponse(changes.evento.currentValue);
  }

  proccesResponse(event: any)
  {
        if(event.type === HttpEventType.UploadProgress)
        {
          this.progressRequest = 'Estamos trabajando espera un momento : ' + (Math.round(event.loaded / event.total * 100 ) -1 )+ '%';
          this.viewProgressRequest.show();
        }
        else{
          if(event.type === HttpEventType.Response)
          {
            this.redirectTo();
          }
        }
  }

  redirectTo()
  {
    console.log('llegue a redirigir'+ this.urlRedirectTo);
    this.viewProgressRequest.hide();
    if(this.enableRedirect)
    {
      this.router.navigate([''+ this.urlRedirectTo, this.paramsRedirecTo]);
    }
  }




}
