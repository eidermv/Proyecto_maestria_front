import { TutorCompleto } from './../../../modelos/tutorCompleto.model';
import { TutorService } from './../../../../seguimientos_admin/servicios/tutor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrearTutorComponent } from '../crear-tutor/crear-tutor.component';
import { VerTutorComponent } from '../ver-tutor/ver-tutor.component';
import { EditarTutorComponent } from '../editar-tutor/editar-tutor.component';
import Swal from 'sweetalert2/*/sweetalert2.js';

@Component({
  selector: 'app-listar-tutores',
  templateUrl: './listar-tutores.component.html',
  styleUrls: ['./listar-tutores.component.scss']
})
export class ListarTutoresComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'correo', 'departamento' ,'universidad','opciones'];
  dataSource: MatTableDataSource<TutorCompleto>;
  bandListar: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tutores: Array<TutorCompleto> = [];
  constructor( private router: Router, private tutorService: TutorService,private dialog: MatDialog) {
   
  }

  ngOnInit(): void {
   
  }
 

}
