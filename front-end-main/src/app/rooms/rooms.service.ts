import { Injectable, OnDestroy } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

import { io } from "socket.io-client";
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomCreateJoin } from "./room-create-join.model";

@Injectable({providedIn: 'root'})
export class RoomsService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public user$: BehaviorSubject<string> = new BehaviorSubject('');
  public userDisconnect$ :BehaviorSubject<string> = new BehaviorSubject('');
  public newMessage = "";
  public roomcode = "";
  private rooms: RoomCreateJoin[] = [];
  private roomsUpdated = new Subject<RoomCreateJoin[]>();
  public socket: any;
  constructor() {

  }



  public setupSocket()
  {
    this.socket = io('http://localhost:3000',
    {query: {roomCode: this.roomcode}});
  }

  public setRoom(room: string){
    this.roomcode = room;
  }

  public sendMessage(message: any) {
    this.socket.emit('chat message', message);
  }

  public getNewMessage = () => {
    this.socket.on('chat message', (message:any) => {
      this.message$.next(message);

      this.newMessage = message;
      console.log(this.newMessage);
    });


    return this.message$.asObservable();
  };

  public getNewUser = () => {
    this.socket.on('user_join', (user:string) => {
      this.user$.next(user);
    });
    return this.user$.asObservable();
  };

  public getUserDisconnect = () => {
    this.socket.on('user_disconnect', (user:string) => {
      this.userDisconnect$.next(user);
    });
    return this.userDisconnect$.asObservable();
  }

  public emitDisconnection (){
    this.socket.emit('disconnected', this.socket.id);
    this.socket.disconnect();
    console.log("disconnected");
  }

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
