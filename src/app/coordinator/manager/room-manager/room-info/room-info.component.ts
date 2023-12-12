import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/room';
import { RoomService } from 'src/app/room.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css']
})
export class RoomInfoComponent {
  rooms: Room[] = [];
  room?: Room;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRooms();
    
    const roomId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(roomId)) {
      this.roomService.getRoom(roomId).subscribe({
        next: (data: Room) => {
          this.room = data;
        },
        error: (error: any) => {
          console.error('Erro ao obter informações da sala/lab:', error);
        }
      });
    } else {
      console.error('ID da sala/lab inválido');
    }
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
}
