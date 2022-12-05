import { Injectable, OnDestroy } from "@angular/core";
import { AES , mode, pad, lib, enc, PBKDF2} from 'crypto-js';
import { Socket } from "ngx-socket-io";
import { map } from "rxjs/operators";

import { io } from "socket.io-client";
import { BehaviorSubject, Subject } from 'rxjs';
import { RoomCreateJoin } from "./room-create-join.model";
import { environment } from "src/environments/environment";

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
  private host = environment.HOST;
  private port = environment.PORT;
  constructor() {

  }

  /**
   * sets SocketIo connection with HOST and PORT environment variables
   * queries only messages from the roomCode
   */
  public setupSocket()
  {
    this.socket = io('http://' + this.host + ':' + this.port,
    {query: {roomCode: this.roomcode}});
  }

  /**
   * sets new room code
   * @param room @type {string} new room code
   */
  public setRoom(room: string){
    this.roomcode = room;
  }

  /**
   * sends new message from user to server via SocketIo after encryption
   * @param message @type {string} message entered from user
   */
  public sendMessage(message: string) {
    var encryptedM = encrypt(message, this.roomcode);
    this.socket.emit('chat message', encryptedM);
  }

  /**
   * listens to socket io for new messages which are then decrypted and set to this.newMessage
   * @returns @type {BehaviorSubject<String>} observable string
   */
  public getNewMessage = () => {
    this.socket.on('chat message', (message:any) => {
      message['message'] = decrypt(message['message'], this.roomcode).toString(enc.Utf8);
      this.message$.next(message);

      this.newMessage = message;
    });


    return this.message$.asObservable();
  };

  /**
   * listens for users from socket io
   * @returns @type {BehaviorSubject<String>} user as observable
   */
  public getNewUser = () => {
    this.socket.on('user_join', (user:string) => {
      this.user$.next(user);
    });
    return this.user$.asObservable();
  };

  /**
   * listens for a user disconnection from room
   * @returns @type {BehaviorSubject<String>} userdisconnection as observable
   */
  public getUserDisconnect = () => {
    this.socket.on('user_disconnect', (user:string) => {
      this.userDisconnect$.next(user);
    });
    return this.userDisconnect$.asObservable();
  }

  /**
   * emits disconnection to server when local user disconnections
   */
  public emitDisconnection (){
    this.socket.emit('disconnected', this.socket.id);
    this.socket.disconnect();
  }

  /**
   *
   * @returns this.rooms
   */
  getRooms() { return [...this.rooms]; }

  /**
   *
   * @returns @type {Subject<RoomCreateJoin[]>} roomsUpdated as observable
   */
  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  /**
   * Adds new room to roomsUpdated
   * @param roomCode new room code
   */
  createRoom(roomCode: string) {
    const post: RoomCreateJoin = {roomCode: roomCode};
    this.rooms.push(post);
    this.roomsUpdated.next([...this.rooms]);
  }
}

/**
 * function to encrypt messages using a known key
 * that will be used on the other side (symmetric key encryption)
 * @param message @type {String} message to be encrypted
 * @param pass @type {String} key for encryption
 * @returns encrypted binary array of the message along with initial value and salting value
 */
function encrypt(message: string, pass: string)
{
  // define some options for the encryption
  var key = enc.Utf8.parse(pass);
  var salt = lib.WordArray.random(128 / 8);
  var iv = lib.WordArray.random(128 / 8); // initial value is needed since it has to be the same on the other side

  // salting the key so even though the key is known, there cannot be a man in the middle that knows it
  var key_salted = PBKDF2(key, salt, {keySize: 128/8, iterations:500});
  var options = { iv: iv, mode: mode.CBC, padding: pad.Pkcs7} // set the options so the encrypt method can use them
  var message_parsed = enc.Utf8.parse(message);
  var encrypted = AES.encrypt(message_parsed, key_salted, options); // encrypt
  var encrypted_bin = enc.Hex.stringify(salt) + ',' + enc.Hex.stringify(iv) + ',' + encrypted;  // attach the salting value, the initial value,
                                                                                                // and the encrypted text so the options can be remade and decrypted
  return encrypted_bin;
}

/** function to decrypt encrypted message that are passed in using a known key
 * @param encrypted binary array with initial value, encrypred message, and salting value
 * @param key_org @type {String} key for decryption
 * @returns @type {String} decrypted message
 */
function decrypt(encrypted: any, key_org: string)
{
  var split_msg = encrypted.split(','); // split the attached values
  var salt = enc.Hex.parse(split_msg[0]); // extract salt value and parse from the Hex hash made before
  var iv = enc.Hex.parse(split_msg[1]); // extract the initial value the same way
  var encrypted_bin = enc.Base64.parse(split_msg[2]); // extract encrypted message


  var pass = enc.Utf8.parse(key_org);
  var key = PBKDF2(pass, salt, {keySize: 128 / 8, iterations: 500}); // create same salted password as used in the encryption method
  var msg = enc.Base64.stringify(encrypted_bin);
  var options = {iv: iv, mode: mode.CBC, padding: pad.Pkcs7}; // set same options as before
  var decrypted_msg = AES.decrypt(msg, key, options); // decrypt
  return decrypted_msg; // boom done
}
