import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { TeachingPracticeService } from '../teachingPractice.service';

@Component({
  selector: 'app-show-hours-and-credits-for-student',
  templateUrl: './show-hours-and-credits-for-student.component.html'
})
export class ShowHoursAndCreditsForStudentComponent implements OnInit {

  hours: string;
  credits: string;
  showForm: boolean;
  showButon: boolean;
  /**********************************VARIABLES DE INSTANCIA********** */
  student : Student;
  constructor(private teachingPracticeService: TeachingPracticeService)
  {
    this.student = new Student();
    this.hours = '0';
    this.credits = '0';
    this.showForm = false;
    this.showButon = true;
   }

  ngOnInit() {
  }

  getStudent(student: {student: Student})
  {
    this.student = student.student;
    this.teachingPracticeService.getHoursAndCredits(this.student.getCodigo())
    .subscribe(data =>
      {
        this.hours = data['horas'];
        this.credits = data['creditos'];
      },err =>
      {

      });
  }

  showFormm()
  {
    this.showButon = false;
    this.showForm = true;
  }

  close()
  {
    this.hours = '0';
    this.credits = '0';
    this.showButon = true;
    this.showForm = false;
  }



}
