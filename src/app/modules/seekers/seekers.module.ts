
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SeekersService } from './seekers.service';
import { SearchStudentComponent } from './student/search-student.component';
import { CitysAndCountriesComponent } from './citys-and-countries/citys-and-countries.component';


@NgModule({
declarations:
      [
        SearchStudentComponent,
        CitysAndCountriesComponent,
      ],
imports:
      [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
      ],
providers:
      [
        SeekersService,
      ],
exports:
      [
        SearchStudentComponent,
        CitysAndCountriesComponent,
      ]
})
export class SeekersModule { }
