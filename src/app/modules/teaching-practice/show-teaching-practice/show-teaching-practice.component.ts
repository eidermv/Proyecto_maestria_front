import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TeachingPractice } from '../../../models/teachingPractice/teachingPractice';
import { TeachingPracticeService } from '../teachingPractice.service';

@Component({
  selector: 'app-show-teaching-practice',
  templateUrl: './show-teaching-practice.component.html'
})
export class ShowTeachingPracticeComponent implements OnInit, AfterViewInit {

  /*****************************VARIABLES DE LOCALES*******************/
  @Input() teachingPractice: TeachingPractice;
  @ViewChild('showTeachingPractice') viewModalTeachingPractice: any ;
  /*************************VARIABLES DE INSTANCIA**************** */
  @Output() cerrar = new EventEmitter<{cerrar: boolean}>();

  constructor(private teachingPracticeService: TeachingPracticeService)
  {

  }

  ngAfterViewInit(): void {
    this.viewModalTeachingPractice.show();
  }
  ngOnInit()
  {
  }
  destroyModal()
  {
    this.cerrar.emit({cerrar: true});
  }
  showFileTeachingPractice(type: string)
  {
    this.teachingPracticeService.getFileTeachingPractice(this.teachingPractice.getIdPractice() , type);
  }


}
