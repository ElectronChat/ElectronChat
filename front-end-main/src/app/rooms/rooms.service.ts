import { Injectable, OnDestroy } from "@angular/core";
//import 'crypto-js';
import { AES , mode, pad, lib, enc, PBKDF2} from 'crypto-js';
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
  private options: any;
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

  public sendMessage(message: string) {
    // console.log("before encrypt");
    // var encryptedM = AES.encrypt(message, this.roomcode);
    // console.log("past encrypt");
    // console.log(encryptedM);
    // var d = AES.decrypt(encryptedM, this.roomcode);
    // console.log(d.toString(enc.Utf8));
    // this.socket.emit('chat message', enc.Hex.stringify(encryptedM.ciphertext));
    var encryptedM = encrypt(message, this.roomcode);
    this.socket.emit('chat message', encryptedM);
    // console.log(encryptedM);
    // console.log("past emit");
  }

  public getNewMessage = () => {
    this.socket.on('chat message', (message:any) => {
      // console.log("past get");
      // console.log(message);
      // var hash = enc.Hex.parse(message['message']);
      // console.log("hash");
      // console.log(hash);
      // var decryptedM = AES.decrypt(message['message'], this.roomcode);
      // //var decryptedM = AES.decrypt(enc.Hex.stringify(hash), this.roomcode);
      // message['message'] = AES.decrypt(message['message'], this.roomcode).toString();
      // console.log("past decrypt");
      // console.log(decryptedM);
      // console.log(decryptedM.toString)
      // console.log(message["message"]);
      // console.log(message);
      // console.log(decryptedM.toString(enc.Utf16));
      // console.log(decryptedM.toString(enc.Hex));
      // console.log(decryptedM.toString(enc.Utf8));
      //console.log("past log");
      message['message'] = decrypt(message['message'], this.roomcode).toString(enc.Utf8);
      this.message$.next(message);

      this.newMessage = message;
      //console.log(this.newMessage);
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

function encrypt(message: string, pass: string)
{
  var key = enc.Utf8.parse(pass);
  var salt = lib.WordArray.random(128 / 8);
  var iv = lib.WordArray.random(128 / 8);
  var key_salted = PBKDF2(key, salt, {keySize: 128/8, iterations:500});
  var options = { iv: iv, mode: mode.CBC, padding: pad.Pkcs7}
  var message_parsed = enc.Utf8.parse(message);
  var encrypted = AES.encrypt(message_parsed, key_salted, options);
  var encrypted_bin = enc.Hex.stringify(salt) + ',' + enc.Hex.stringify(iv) + ',' + encrypted;

  return encrypted_bin;
}

function decrypt(encrypted: any, key_org: string)
{
  var split_msg = encrypted.split(',');
  var salt = enc.Hex.parse(split_msg[0]);
  var iv = enc.Hex.parse(split_msg[1]);
  var encrypted_bin = enc.Base64.parse(split_msg[2]);
  var pass = enc.Utf8.parse(key_org);
  var key = PBKDF2(pass, salt, {keySize: 128 / 8, iterations: 500});
  var msg = enc.Base64.stringify(encrypted_bin);
  var options = {iv: iv, mode: mode.CBC, padding: pad.Pkcs7};
  var decrypted_msg = AES.decrypt(msg, key, options);
  return decrypted_msg;
}
