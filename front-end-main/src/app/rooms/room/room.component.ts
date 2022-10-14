import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomCreateJoin } from '../room-create-join.model';
import { RoomsService } from '../rooms.service';
import { NgForm } from '@angular/forms';

@Component ( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  messageList: string[] = [];

  // posts: RoomCreateJoin[] = [];
  // private postsSub: Subscription = new Subscription;

  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.roomsService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
    // this.posts = this.roomsService.getRooms();
    // this.postsSub = this.roomsService.getRoomUpdateListener().subscribe((posts: RoomCreateJoin[]) => {
    //   this.posts = posts;
    // });
  }

  sendMessage(form: NgForm) {
    if (form.invalid) {return;}
    this.roomsService.sendMessage(form.value.new_message);
    form.resetForm();
  }

  ngOnDestroy() {
    // this.postsSub.unsubscribe();
  }
}
