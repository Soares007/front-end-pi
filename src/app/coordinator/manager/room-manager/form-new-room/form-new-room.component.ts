import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/room';
import { RoomService } from 'src/app/room.service';

@Component({
  selector: 'app-form-new-room',
  templateUrl: './form-new-room.component.html',
  styleUrls: ['./form-new-room.component.css']
})
export class FormNewRoomComponent {
  formGroupRoom: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;

  rooms: Room[] = [];

  constructor(private roomService: RoomService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.formGroupRoom = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      identity: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\u00C0-\u017F\s]*[a-zA-Z\u00C0-\u017F]?[a-zA-Z0-9\u00C0-\u017F\s]*$/)]],
    });
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (id) {
      this.getRoomById(id);
    }

  }

  getRoomById(id: number) {
    this.roomService.getRoom(id).subscribe({
      next: data => {

        this.formGroupRoom.setValue({
          id: data.id,
          name: data.name,
          identity: data.identity
        });

        this.isEditing = true;
      }
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupRoom.valid) {
      const formValue = this.formGroupRoom.value;

      if (this.isEditing) {
        this.roomService.update(formValue).subscribe({
          next: () => {
            this.router.navigate(['room-manager']);
          }
        });
      } else {
        this.roomService.save(formValue).subscribe({
          next: () => {
            this.router.navigate(['room-manager']);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['room-manager']);
  }

  get name(): any {
    return this.formGroupRoom.get("name");
  }

  get identity(): any {
    return this.formGroupRoom.get("identity");
  }
}
