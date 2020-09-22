import { ListarTutorComponent } from './../componentes/listar-tutor/listar-tutor.component';
import { TutoresRoutingModule } from './tutores-routing.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { TutorService } from '../servicios/tutor.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    declarations: [
      ListarTutorComponent
    ],
    imports: [
      CommonModule,
      TutoresRoutingModule ,MatTableModule,
      MatSortModule,
      MatInputModule,    
      MatIconModule,
      MatPaginatorModule,
      MatCardModule,
      MatAutocompleteModule,
      MatProgressBarModule,
      MatButtonModule,
      MatExpansionModule,
    ],
    providers: [TutorService],
  })
  export class TutorModule 
  { 
      
  }
  