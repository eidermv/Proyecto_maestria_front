import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal-fail',
  templateUrl: './modal-fail.component.html'
})
export class ModalFailComponent implements AfterViewInit {
  /******************************Variables Locales*******************/
  @Input() msjFail: string;
  @ViewChild('failModal') viewModalMsjOk: any ;

  constructor() { }

  ngAfterViewInit(): void {
    this.viewModalMsjOk.show();
  }

}
