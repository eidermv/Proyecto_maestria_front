import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal-ok',
  templateUrl: './modal-ok.component.html'
})
export class ModalOkComponent implements AfterViewInit {

  /******************************Variables Locales*******************/
  @Input() msjOk: string;
  @ViewChild('okModal') viewModalMsjOk: any ;

  constructor() { }

  ngAfterViewInit(): void {
    this.viewModalMsjOk.show();
  }

}
