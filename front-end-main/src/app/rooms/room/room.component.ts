import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomsService } from '../rooms.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute} from "@angular/router";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  /**
   * @type {ViewChild(CdkVirtualScrollViewport)}
   */
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;

  /**
   * @type {string[]} array to hold current messages in room
   */
  messageList: string[] = [];

  /**
   * @type {string[]} array to hold current users in room
   */
  userList: string[] = [];

  private roomServ: Subscription = new Subscription;
  private userServ: Subscription = new Subscription;
  private userDisconnect: Subscription = new Subscription;
  private roomCode: string = "";

  constructor(public roomsService: RoomsService, private route: ActivatedRoute) {}
  // Constructor for component. Subscribes to io for messages. When new message is acquired,
  // will append to current list

  onLoad()
  {

  }

  /**
   * Called when component is constructed
   * handles socket setup, message listening, and listening for user connections and disconnections
   */
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.roomCode = params['id'];
    })


    this.roomsService.setRoom(this.roomCode);
    this.roomsService.setupSocket();

    this.roomServ = this.roomsService.getNewMessage().subscribe((message: any) => {
      this.messageList = [...this.messageList, message];

   });



   this.userServ = this.roomsService.getNewUser().subscribe((user: string) => {
    if(this.userList.includes(""))
    {
      this.userList.shift()
    }
    if(!this.userList.includes(user.toString()))
    {
      this.userList = [ ...this.userList, user.toString()];
    }
   });

   this.userDisconnect = this.roomsService.getUserDisconnect().subscribe((user:string) => {
    if (this.userList.includes(user.toString()))
    {
      const indexToDelete = this.userList.indexOf(user.toString(), 0);
      this.userList = this.userList.filter((item, index) => index !== indexToDelete)
    }
   })

  }

  /** Called when a message is typed and send button is pressed
  * grabs message and sends to server. Clears input form
  */
  sendMessage(form: NgForm) {
    if (form.invalid) {return;}
    this.roomsService.sendMessage(form.value.new_message);
    form.resetForm();
  }

  /** Will be called when the room component is destroyed by reloading or navigating to new page
  * Unsuscribes from the room's service and reloads page so nothing is saved
  */
  ngOnDestroy() {
    this.roomsService.emitDisconnection();
    this.roomServ.unsubscribe();
    this.roomsService.socket.removeAllListeners('chat message');
    location.reload();
  }

  /**
   * Confirms if user wants to leave room
   * @returns {string} window close confirmation */
  canExit() {
    return confirm('Leaving the Room with delete all messages. Are you sure?')
  }

  /**
   *
   * @returns this.userlist.length
   */
  getUserListLength()
  {
    return this.userList.length;
  }

  /**
   *
   * @returns this.roomCode
   */
  getRoomCode()
  {
    return this.roomCode;
  }
}
