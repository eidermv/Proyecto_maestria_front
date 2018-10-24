import { NgModule } from '@angular/core';
import { AddLineComponent } from './addLine/addLine.component';
import { LineRoutingModule } from './line.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LineService } from './line.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditLineComponent } from '../Line/edit-line/edit-line.component';



@NgModule({
  declarations:
            [
            AddLineComponent,
            EditLineComponent
            ],
  imports:
            [
            LineRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            CommonModule,
            ModalModule.forRoot(),
            ],
  providers:
            [
              LineService
            ]
})

export class LineModule {}
