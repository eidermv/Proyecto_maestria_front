import { TutorCompleto } from './../../../modelos/tutorCompleto.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-tutor',
  templateUrl: './ver-tutor.component.html',
  styleUrls: ['./ver-tutor.component.scss']
})
export class VerTutorComponent implements OnInit {
  tutor:TutorCompleto;
  constructor() { }

  ngOnInit() {
  }

}
