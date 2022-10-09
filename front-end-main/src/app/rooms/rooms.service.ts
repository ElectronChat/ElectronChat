import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

import { io } from "socket.io-client";
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomCreateJoin } from "./room-create-join.model";

@Injectable({providedIn: 'root'})
export class RoomsService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  private rooms: RoomCreateJoin[] = [];
  private roomsUpdated = new Subject<RoomCreateJoin[]>();

  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  getRooms() { return [...this.rooms]; }

  getRoomUpdateListener() {

    return this.roomsUpdated.asObservable();
  }

  createRoom(roomCode: string) {
    const post: RoomCreateJoin = {roomCode: roomCode};
    this.rooms.push(post);
    this.roomsUpdated.next([...this.rooms]);
  }
}
