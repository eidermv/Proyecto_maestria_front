import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';
import { TeachingPracticeService } from '../teachingPractice.service';
import { ModalBackdropOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-show-teaching-practice',
  templateUrl: './show-teaching-practice.component.html'
})
export class ShowTeachingPracticeComponent implements OnInit, AfterViewInit {

  /*****************************VARIABLES DE LOCALES*******************/
  @Input() teachingPractice: TeachingPractice;
  @ViewChild('showTeachingPractice') viewModalTeachingPractice: any ;
  showData: boolean;
  /*************************VARIABLES DE INSTANCIA**************** */
  @Output() cerrar = new EventEmitter<{cerrar: boolean}>();

  constructor(private teachingPracticeService: TeachingPracticeService) {
    this.showData = false;

  }

  ngAfterViewInit(): void {
   this.viewModalTeachingPractice.show();
  }
  verifyDates() {
    if (this.teachingPractice.getDateStart() === null) {
      this.showData = false;
    } else {
      this.showData = true;
    }
  }

  ngOnInit() {
    this.verifyDates();
  }
  destroyModal() {
    this.cerrar.emit({cerrar: true});
  }
  showFileTeachingPractice(type: string) {
    this.teachingPracticeService.getFileTeachingPractice(this.teachingPractice.getIdPractice() , type);
  }

  nn() {

  }




}
