import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component ( {
  selector: 'app-room-create-join',
  templateUrl: './room-create-join.component.html',
  styleUrls: ['./room-create-join.component.css']
})
export class RoomCreateJoinComponent {
  enteredRoom = "";
  roomIndex = 0;

  constructor(private location:Location, private _router: Router) {}

  onJoinCreateRoom(form: NgForm) {
    if (form.invalid) { return; }
    //this.location.replaceState(`/room/${form.value.roomCode}`);
    this._router.navigateByUrl(`/room/${form.value.roomCode}`)
    //this.roomIndex = this.roomsService.getRooms().length - 1;
    form.resetForm();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
