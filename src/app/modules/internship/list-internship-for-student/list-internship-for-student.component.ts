import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InternshipService } from '../intership.service.service';

@Component({
  selector: 'app-list-internship-for-student',
  templateUrl: './list-internship-for-student.component.html'
})
export class ListInternshipForStudentComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  codeStudent: string;
  optionsInternship: Array<string>;

  constructor(private internshipService: InternshipService,private route: ActivatedRoute,private router: Router)
  {
    this.optionsInternship = [];
  }

  getDateStudent()
  {
   this.internshipService.getStudent()
   .subscribe(data =>
    {
      this.codeStudent = data['codigo'];
      this.getAllInternship();
    },err =>
    {

    });
  }

  getAllInternship()
  {
    this.internshipService.getAllInternshipForStudent(this.codeStudent)
    .subscribe(data=>
      {
        this.optionsInternship = data;
      }, err =>
      {

      });
  }

  ngOnInit() {
    this.getDateStudent();
  }

}
