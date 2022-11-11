import { Injectable, OnDestroy } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AES } from 'crypto-js';
import { map } from "rxjs/operators";

import { io } from "socket.io-client";
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomCreateJoin } from "./room-create-join.model";

@Injectable({providedIn: 'root'})
export class RoomsService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public user$: BehaviorSubject<string> = new BehaviorSubject('');
  public newMessage = "";
  public roomcode = "";
  private encryptedRoomcode = "";
  private rooms: RoomCreateJoin[] = [];
  private roomsUpdated = new Subject<RoomCreateJoin[]>();
  public socket: any;
  constructor() {

  }



  public setupSocket()
  {
    this.socket = io('http://localhost:3000',
    {query: {roomCode: this.encryptedRoomcode}});
  }

  public setRoom(room: string){
    this.encryptedRoomcode = AES.encrypt(room, room).toString();
    this.key = room; // set key to roomcode for encryption and decryption
  }

  public sendMessage(message: any) {
    var encryptedMessage = AES.encrypt(message, this.key).toString();
    console.log("Sending message (string): " + encryptedMessage.toString());
    console.log("Sending message (): " + encryptedMessage);
    this.socket.emit('chat message', encryptedMessage);
  }

  public getNewMessage = () => {
    this.socket.on('chat message', (message:any) => {
      this.message$.next(message);

      console.log("New message (string): " + message);
      var decryptedMessage = AES.decrypt(message, this.key);
      this.newMessage = decryptedMessage.toString(CryptoJS.enc.Utf8);
    });


    return this.message$.asObservable();
  };

  public getNewUser = () => {
    this.socket.on('user_join', (user:string) => {
      this.user$.next(user);
    });
    return this.user$.asObservable();
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
