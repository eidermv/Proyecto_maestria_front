import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Internship } from '../../../models/internship/internship';
import { InternshipService } from '../intership.service.service';

@Component({
  selector: 'app-show-internship',
  templateUrl: './show-internship.component.html'
})
export class ShowInternshipComponent implements OnInit, AfterViewInit {

  /*****************************VARIABLES LOCALES***********/
  @ViewChild('showInternship') viewModalInternship: any ;
  /**************************VARIABLES DE INSTANBIA**************/
  @Input() internship: Internship;
  /*************************VARIABLES DE INSTANCIA**************** */
  @Output() cerrar = new EventEmitter<{cerrar: boolean}>();

  constructor(private internshipService: InternshipService) {
  }
  ngAfterViewInit(): void {
    this.viewModalInternship.show();
  }

  ngOnInit() {

  }

  destroyModal() {
    this.cerrar.emit({cerrar: true});
  }

  showFileInternship(type: string) {
    this.internshipService.getFileInternship(this.internship.getIdInternship(), type);
  }

}
