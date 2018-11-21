import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachingPracticeService } from '../teachingPractice.service';

@Component({
  selector: 'app-list-teaching-practice-for-admin',
  templateUrl: './list-teaching-practice-for-admin.component.html'
})
export class ListTeachingPracticeForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
   codeStudent: string;
   optionsTeachingPractice: Array<string>;
   p: any;

  constructor(private teachingPracticeService: TeachingPracticeService)
  {
    this.optionsTeachingPractice = [];
  }

  getAllTeachingPractice()
  {
    this.teachingPracticeService.getAllTeachingPracticeAdmin()
    .subscribe(data =>
      {
        this.optionsTeachingPractice = data;
      }, err =>
      {

      });
  }

  ngOnInit() {
    this.getAllTeachingPractice();
  }

}
