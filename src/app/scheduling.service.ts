import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scheduling } from './scheduling';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  url = 'http://localhost:8080/schedulings';

  constructor(private http: HttpClient) { }

  getSchedulings(): Observable<Scheduling[]> {
    return this.http.get<Scheduling[]>(this.url);
  }

  getScheduling(id: number): Observable<Scheduling> {
    return this.http.get<Scheduling>(`${this.url}/${id}`);
  }

  save(scheduling: Scheduling): Observable<Scheduling> {
    return this.http.post<Scheduling>(this.url, scheduling);
  }

  update(scheduling: Scheduling): Observable<Scheduling> {
    return this.http.put<Scheduling>(`${this.url}/${scheduling.id}`, scheduling);
  }

  delete(scheduling: Scheduling): Observable<void> {
    return this.http.delete<void>(`${this.url}/${scheduling.id}`);
  }
}
