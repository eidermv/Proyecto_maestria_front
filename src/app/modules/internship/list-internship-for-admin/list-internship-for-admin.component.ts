import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../intership.service.service';

@Component({
  selector: 'app-list-internship-for-admin',
  templateUrl: './list-internship-for-admin.component.html'
})
export class ListInternshipForAdminComponent implements OnInit {

  /****************************VARIABLES LOCALES************************/
  optionsInternship: Array<string>;
  p: any;


  constructor(private internshipService: InternshipService)
  {
    this.optionsInternship = [];
  }

  getAllInternshipAdmin()
  {
    this.internshipService.getAllInternshipForAdmin()
    .subscribe(data =>
      {
        this.optionsInternship = data;
      }, err =>
      {

      })
  }

  ngOnInit() {
    this.getAllInternshipAdmin();
  }

}
