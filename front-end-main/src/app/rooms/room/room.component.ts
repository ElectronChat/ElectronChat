import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomCreateJoin } from '../room-create-join.model';
import { RoomsService } from '../rooms.service';
import { NgForm } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component ( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  messageList: string[] = [];

  // posts: RoomCreateJoin[] = [];
  private roomServ: Subscription = new Subscription;

  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.roomServ = this.roomsService.getNewMessage().subscribe((message: string) => {
      //this.messageList.push(message);
     this.messageList = [...this.messageList, message];
     console.log("new iteration")
     this.messageList.forEach(elem => {
       console.log(elem)
     });
     console.log("end of it");
   });
    // this.roomServ.subscribe((message: string) => {
    //    //this.messageList.push(message);
    //   this.messageList = [...this.messageList, message];
    //   console.log("new iteration")
    //   this.messageList.forEach(elem => {
    //     console.log(elem)
    //   });
    //   console.log("end of it");
    // });
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
    this.roomServ.unsubscribe();
    this.roomsService.socket.removeAllListeners('chat message');
    location.reload();
  }
}
