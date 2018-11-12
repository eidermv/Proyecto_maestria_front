import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StringApp } from '../../resources/stringApp';
import { Student } from '../../models/student';

const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});



@Injectable()
export class StudentService
{
  stringApp: StringApp;
  student: Student;

  constructor(private httpClient: HttpClient)
  {
    this.stringApp= new StringApp();
    this.student = new Student();
  }

  getAllTutors()
  {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_TUTORS);
  }

  createStudent(student: Student)
  {
    const newStudent = JSON.stringify(
      {
        codigo: student.getId(),
        nombres: student.getName(),
        apellidos: student.getSurname(),
        correo: student.getEmail(),
        cohorte: student.getCohorte(),
        semestre: student.getEnteredSemester(),
        estado: student.getState(),
        pertenece: student.getEnteredBy(),
        tutor: student.getTutor()
      }
    );
    return this.httpClient.post(this.stringApp.URL_SERVICIO_CREATE_STUDENT, newStudent,
                              {headers : new HttpHeaders({ 'Content-Type': 'application/json'}) ,
                                 reportProgress: true, observe: 'events'});
  }

  getAllStudents()
  {

    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_STUDENTS );
  }

  getStudentByCode(code: string)
  {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_SEARCH_STUDENT_BY_CODE + code);
  }

  updateStudent(student: Student)
  {
    const updateStudent = JSON.stringify(
      {
        id: student.getId(),
        codigo: student.getCodigo(),
        nombres: student.getName(),
        apellidos: student.getSurname(),
        correo: student.getEmail(),
        cohorte: student.getCohorte(),
        semestre: student.getEnteredSemester(),
        estado: student.getState(),
        pertenece: student.getEnteredBy(),
        tutor: student.getTutor()
      }
    );
    return this.httpClient.post(this.stringApp.URL_SERVICIO_UPDATE_STUDENT, updateStudent ,
                                {headers : new HttpHeaders({ 'Content-Type': 'application/json'}) ,
                                reportProgress: true, observe: 'events'});
  }
}
