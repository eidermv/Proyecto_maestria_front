import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {
/***********************VARIABLES LOCALES**************** */
  titleAddBook: string;
  subtitleAddBook: string;
  nameBtnAddBook: string;
  /*************************VARIABLES DE INSTANCIA********* */
  @Output() getDateBook = new EventEmitter<{isbn: string, title: string, editorial: string, city: string, country: string
    fileBook: File, fileCertificate: File}>();

  constructor()
  {
    this.titleAddBook = 'Datos Libro';
    this.subtitleAddBook = 'En este formulario ingrese los datos del  capitulo de un libro, recuerde los campos con * son obligatorios.'
                                  +' No olvide cargar los archivos necesarios';
    this.nameBtnAddBook = 'Registrar Libro';
  }

  ngOnInit() {
  }

  getDataPublicationBook(dataBook: {isbn: string, title: string, editorial: string, city: string, country: string
                        fileBook: File, fileCertificate: File})
  {
   this.getDateBook.emit(
                          {
                            isbn: dataBook.isbn,
                            title: dataBook.title,
                            editorial: dataBook.editorial,
                            city: dataBook.city,
                            country: dataBook.country,
                            fileBook: dataBook.fileBook,
                            fileCertificate: dataBook.fileCertificate
                          }
                        );
  }
}
