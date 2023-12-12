import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = 'http://localhost:8080/rooms';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`);
  }

  save(room: Room): Observable<Room> {
    return this.http.post<Room>(this.url, room);
  }

  update(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.url}/${room.id}`, room);
  }

  delete(room: Room): Observable<void> {
    return this.http.delete<void>(`${this.url}/${room.id}`);
  }
}
