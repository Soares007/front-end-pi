import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/room';
import { RoomService } from 'src/app/room.service';

@Component({
  selector: 'app-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.css']
})
export class RoomManagerComponent {
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService, private router: Router,  private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(){
    this.roomService.getRooms().subscribe({
      next: (data) => (this.rooms = data)
    });
  }

  create(){
    this.router.navigate(['createRoom']);
  }

  edit(room: Room) {
    this.router.navigate(['roomDetails', room.id]);
  }

  delete(room: Room) {
    this.roomService.delete(room).subscribe({
      next: () => this.loadRooms()
    });
  }

  viewInformation(room: Room) {
    this.router.navigate(['room-info', room.id]);
  }

}
