import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterContentChecked, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PublicationService } from '../publications.service';
import { Magazine } from '../../../models/publications/magazine';
import { Book } from '../../../models/publications/book';
import { CapBook } from '../../../models/publications/capLibro';
import { EventPublication } from '../../../models/publications/event';

 /***************************VARIABLES GLOBALES*********** */
 const MAGAZINE: string = 'Revista';
 const BOOK: string = 'Libro';
 const CAP_BOK: string = 'Capítulo de libro';
 const EVENT: string = 'Evento';

@Component({
  selector: 'app-show-publication',
  templateUrl: './show-publication.component.html'
})



export class ShowPublicationComponent implements OnInit {


   /***********************VARIABLES LOCALES**************** */
   @ViewChild('showMagazime') viewMagazine: any ;
   @ViewChild('showBook') viewBook: any ;
   @ViewChild('showCapBook') viewCapBook: any;
   @ViewChild('showEvent') viewEvent: any;
   @Input() typePublication:  string;
   @Input() idPublication: string;
   state: string;

   /**************************VARIABLES DE INSTANCIA******** */
   @Output() cerrar = new EventEmitter<{cerrar: boolean}>();
   magazine: Magazine;
   book: Book;
   capBook: CapBook;
   eventt: EventPublication;


  constructor(private publicationsService: PublicationService)
  {
    this.magazine = new Magazine();
    this.book = new Book();
    this.capBook = new CapBook();
    this.eventt = new EventPublication();

  }

  ngOnInit(): void {
     this.getPublication();
  }
  getPublication()
  {
    this.publicationsService.getPublication(this.typePublication, this.idPublication)
    .subscribe(data =>
      {
         this.showPublication(data);
      }, err =>
      {
        //this.showFail();
      });
  }

  showPublication(data: any)
  {
    switch (this.typePublication)
    {
      case MAGAZINE:
          this.magazine.setCredits(data['publicacion']['creditos']);
          this.magazine.setComentary(data['publicacion']['comentario']);
          this.magazine.setAuthor(data['publicacion']['estudiante']['nombres']+ ' ' +
                                  data['publicacion']['estudiante']['apellidos']);
          this.magazine.setCode(data['publicacion']['estudiante']['codigo']);
          this.magazine.setSecondaryAuthors(data['publicacion']['autoresSecundarios']);
          this.magazine.setDoi(data['doi']);
          this.magazine.setTitleArticle(data['tituloArticulo']);
          this.magazine.setNameMagazine(data['nombreRevista']);
          this.magazine.setCategoryMagazine(data['categoria']);
          this.state = data['publicacion']['estado'];
          this.viewMagazine.show({ backdrop: 'static', keyboard: false });
      break;

      case BOOK:
          this.book.setCredits(data['publicacion']['creditos']);
          this.book.setComentary(data['publicacion']['comentario']);
          this.book.setAuthor(data['publicacion']['estudiante']['nombres'] + ' ' +
                                  data['publicacion']['estudiante']['apellidos']);
          this.book.setCode(data['publicacion']['estudiante']['codigo']);
          this.book.setSecondaryAuthors(data['publicacion']['autoresSecundarios']);
          this.book.setIsbn(data['isbn']);
          this.book.setTitleBook(data['tituloLibro']);
          this.book.setEditorial(data['editorial']);
          this.book.setCounty(data['pais']);
          this.book.setCity(data['ciudad']);
          this.state = data['publicacion']['estado'];
          this.viewBook.show();
      break;

      case CAP_BOK:
          this.capBook.setCredits(data['publicacion']['creditos']);
          this.capBook.setComentary(data['publicacion']['comentario']);
          this.capBook.setAuthor(data['publicacion']['estudiante']['nombres'] + ' ' +
          data['publicacion']['estudiante']['apellidos']);
          this.capBook.setCode(data['publicacion']['estudiante']['codigo']);
          this.capBook.setSecondaryAuthors(data['publicacion']['autoresSecundarios']);
          this.capBook.setIsbn(data['isbn']);
          this.capBook.setTitleBook(data['tituloLibro']);
          this.capBook.setEditorial(data['editorial']);
          this.capBook.setTitleCapBook(data['tituloCapituloLibro']);
          this.state = data['publicacion']['estado'];
          this.viewCapBook.show();
      break;

      case EVENT:
          this.eventt.setCredits(data['publicacion']['creditos']);
          this.eventt.setComentary(data['publicacion']['comentario']);
          this.eventt.setAuthor(data['publicacion']['estudiante']['nombres'] + ' ' +
          data['publicacion']['estudiante']['apellidos']);
          this.eventt.setCode(data['publicacion']['estudiante']['codigo']);
          this.eventt.setSecondaryAuthors(data['publicacion']['autoresSecundarios']);
          this.eventt.setNameEvent(data['nombreEvento']);
          this.eventt.setTypeEvent(data['tipoEvento']);
          this.eventt.setDoi(data['doi']);
          this.eventt.setDataStart(data['fechaInicio']);
          this.eventt.setDataFinish(data['fechaFin']);
          this.eventt.setISSN(data['issn']);
          this.eventt.setTittlePresentation(data['tituloPonencia']);
          this.eventt.setCounty(data['pais']);
          this.eventt.setCity(data['ciudad']);
          this.state = data['publicacion']['estado'];
          this.viewEvent.show();
      break;
    }
  }

  destroyModal()
  {
    this.cerrar.emit({cerrar: true});
  }

  showFilesMagazine(typeFile: string)
  {
    this.publicationsService.getFile(MAGAZINE, typeFile , this.idPublication);
  }

  showFilesBook(typeFile: string)
  {
    this.publicationsService.getFile(BOOK, typeFile , this.idPublication);
  }

  showFilesCapBook(typeFile: string)
  {
    this.publicationsService.getFile(CAP_BOK, typeFile , this.idPublication);
  }

  showFilesEvent(typeFile: string)
  {
    this.publicationsService.getFile(EVENT, typeFile , this.idPublication);
  }
}
