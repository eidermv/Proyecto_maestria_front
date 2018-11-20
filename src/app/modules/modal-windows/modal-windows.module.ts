import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOkComponent } from './modal-ok/modal-ok.component';
import { ModalFailComponent } from './modal-fail/modal-fail.component';
import { ModalProgressComponent } from './modal-progress/modal-progress.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot()
  ],
  declarations: [ModalOkComponent, ModalFailComponent, ModalProgressComponent],
  exports: [ModalOkComponent, ModalFailComponent, ModalProgressComponent],
})
export class ModalWindowsModule { }
