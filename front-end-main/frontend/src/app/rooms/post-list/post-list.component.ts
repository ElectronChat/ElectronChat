import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { RoomCreateJoin } from '../room-create-join.model';
import { RoomsService } from "../rooms.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the second post\'s content'},
  //   {title: 'Third Post', content: 'This is the third post\'s content'},
  // ];

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
