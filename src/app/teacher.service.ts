import { Teacher } from './teacher';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  url = 'http://localhost:8080/teachers';
  constructor(private http: HttpClient ) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/${id}`);
  }

  save(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.url, teacher);
  }

  update(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.url}/${teacher.id}`, teacher);
  }

  delete(teacher: Teacher): Observable<void>{
    return this.http.delete<void>(`${this.url}/${teacher.id}`);
  }

  removeSubjectsFromTeacher(teacherId: number, subjectsToRemove: number[]): Observable<any> {
    const url = `${this.url}/${teacherId}/remove-subjects`;
    return this.http.patch(url, { subjects: subjectsToRemove });
  }
}
