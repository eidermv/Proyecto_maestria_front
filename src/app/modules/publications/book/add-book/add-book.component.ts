import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html'
})
export class AddBookComponent implements OnInit {
/***********************VARIABLES LOCALES**************** */
  titleAddBook: string;
  subtitleAddBook: string;
  nameBtnAddBook: string;

  constructor()
  {
    this.titleAddBook = 'Datos Para el libro';
    this.subtitleAddBook = 'En este formulario ingrese los datos del libro, recuerde los campos con * son obligatorios.'
                                  +' No olvide cargar los archivos necesarios';
    this.nameBtnAddBook = 'Registrar Libro';
  }

  ngOnInit() {
  }

}
