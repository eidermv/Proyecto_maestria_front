import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StringApp } from '../../resources/stringApp';
import { Student } from '../../models/student';


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
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_TUTORS,httpOptions);
  }

  createStudent(student: Student)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
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
    return this.httpClient.post(this.stringApp.URL_SERVICIO_CREATE_STUDENT, newStudent, httpOptions);
  }

  getAllStudents()
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_GET_ALL_STUDENTS, httpOptions );
  }

  getStudentByCode(code: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_SEARCH_STUDENT_BY_CODE + code, httpOptions);
  }

  updateStudent(student: Student, oldIdStudent: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
    const updateStudent = JSON.stringify(
      {
        codigoAnterior: oldIdStudent,
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
    return this.httpClient.post(this.stringApp.URL_SERVICIO_UPDATE_STUDENT, updateStudent, httpOptions);
  }

}
