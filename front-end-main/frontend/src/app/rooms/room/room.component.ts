import { Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RoomCreateJoin } from '../room-create-join.model';
import { RoomsService } from '../rooms.service';

@Component ( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class Room implements OnInit, OnDestroy {
  posts: RoomCreateJoin[] = [];
  private postsSub: Subscription = new Subscription;

  constructor(public roomsService: RoomsService) {}

  ngOnInit() {
    this.posts = this.roomsService.getRooms();
    this.postsSub = this.roomsService.getRoomUpdateListener().subscribe((posts: RoomCreateJoin[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
