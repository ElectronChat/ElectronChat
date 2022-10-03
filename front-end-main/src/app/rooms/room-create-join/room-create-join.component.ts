import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { RoomsService } from '../rooms.service';
@Component ( {
  selector: 'app-room-create-join',
  templateUrl: './room-create-join.component.html',
  styleUrls: ['./room-create-join.component.css']
})
export class RoomCreateJoinComponent {
  enteredRoom = "";

  constructor(public roomsService: RoomsService) {}

  onJoinCreateRoom(form: NgForm) {
    if (form.invalid) { return; }
    this.roomsService.createRoom(form.value.roomCode);
    form.resetForm();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
