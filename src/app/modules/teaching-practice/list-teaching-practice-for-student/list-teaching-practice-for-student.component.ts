import { Component, OnInit } from '@angular/core';
import { TeachingPracticeService } from '../teachingPractice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-teaching-practice-for-student',
  templateUrl: './list-teaching-practice-for-student.component.html'
})
export class ListTeachingPracticeForStudentComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  codeStudent: string;
  optionsTeachingPractice: Array<string>;
  p: any;
  constructor(private teachingPracticeService: TeachingPracticeService,
              private route: ActivatedRoute,private router: Router)
  {
    this.optionsTeachingPractice = [];
  }

  getDateStudent()
  {
   this.teachingPracticeService.getStudent()
   .subscribe(data =>
    {
      this.codeStudent = data['codigo'];
      this.getAllTeachingPractice();
    },err =>
    {

    });
  }

  getAllTeachingPractice()
  {
    this.teachingPracticeService.getAllTeachingPractice(this.codeStudent)
    .subscribe(data =>
      {
        this.optionsTeachingPractice = data;
      }, err =>
      {

      });
  }

  ngOnInit() {
    this.getDateStudent();
  }

}
