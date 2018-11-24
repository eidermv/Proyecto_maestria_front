import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-cap-book',
  templateUrl: './add-cap-book.component.html'
})
export class AddCapBookComponent implements OnInit {
/***********************VARIABLES LOCALES**************** */
@Output() getDateCapBook = new EventEmitter<{isbn: string, title: string, editorial: string, titleCapLibro: string
  fileBook: File, fileCertificate: File}>();
  titleAddBook: string;
  subtitleAddBook: string;
  nameBtnAddBook: string;
  constructor()
  {
    this.titleAddBook = 'Datos de capítulo de Libro';
    this.subtitleAddBook = 'En este formulario ingrese los datos del capítulo del libro, recuerde los campos con * son obligatorios.'
                                  +' No olvide cargar los archivos necesarios';
    this.nameBtnAddBook = 'Registrar Capítulo Libro';
   }

  ngOnInit() {
  }

  getDatePublicationCapBook(dataCapBook: {isbn: string, title: string, editorial: string, titleCapLibro: string
    fileBook: File, fileCertificate: File})
  {
    this.getDateCapBook.emit(
                              {
                                isbn: dataCapBook.isbn,
                                title: dataCapBook.title,
                                editorial: dataCapBook.editorial,
                                titleCapLibro: dataCapBook.titleCapLibro,
                                fileBook: dataCapBook.fileBook,
                                fileCertificate: dataCapBook.fileCertificate,
                              }
                            );
  }

}
