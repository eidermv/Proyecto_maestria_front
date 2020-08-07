import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit {
/*****************************VARIABLES LOCALES********** */
@Output() getDataEvent = new EventEmitter<{doi: string, issn: string, typEvent: string, city: string, country: string
  titlePresentation: string, nameEvent: string, dateStart: string, dateFinish: string, filePresentation: File, fileCertificate: File}>();
titleAddEvent: string;
subtitleAddEvent: string;
nameBtnAddEvent: string;
  constructor() {
    this.titleAddEvent = 'Datos de Evento';
    this.subtitleAddEvent = 'En este formulario ingrese los datos para el evento, recuerde los campos con * son obligatorios.'
                                  + ' No olvide cargar los archivos necesarios';
    this.nameBtnAddEvent = 'Registrar Evento';
   }

  ngOnInit() {
  }

  getDataaEvent(dataEvent: {doi: string, issn: string, typEvent: string, city: string, country: string
                           titlePresentation: string, nameEvent: string, dateStart: string, dateFinish: string, filePresentation: File,
                           fileCertificate: File}) {
    this.getDataEvent.emit(
                            {
                              doi: dataEvent.doi,
                              issn: dataEvent.issn,
                              typEvent: dataEvent.typEvent,
                              city: dataEvent.city,
                              country: dataEvent.country,
                              titlePresentation: dataEvent.titlePresentation,
                              nameEvent: dataEvent.nameEvent,
                              dateStart: dataEvent.dateStart,
                              dateFinish: dataEvent.dateFinish,
                              filePresentation: dataEvent.filePresentation,
                              fileCertificate: dataEvent.fileCertificate,
                            }
                            );
  }

}
