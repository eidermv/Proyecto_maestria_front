import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {

  constructor(private studentService: StudentService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    console.log(id);
  }

}
