import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomsService } from '../rooms.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;
  //messageList: string[] = [];
  messageList: string[] = ["Random","Random", "James","Random","Random", "James","Phil","Phil","Random","Random", "James","Phil","Hello","Frgughugehgueugeugrehgurehgeughreughreughreugrheugrehgurehgruehgreughreughreugrehugrehgruehgreughreugrehgurehgreugrehgurehgreugrheugehugr"];
  userList: string[] = ["Jamewfewfewfewfewfewfewfewfwes","Hellooeowfofoefeowfoew", "Philip", "Semaj", "Pilihp", "Henry", "Zac", "Paul", "George", "Lenoard", "Harry"];
  // posts: RoomCreateJoin[] = [];
  private roomServ: Subscription = new Subscription;
  private roomCode: string = "";

  constructor(public roomsService: RoomsService, private route: ActivatedRoute) {}
  // Constructor for component. Subscribes to io for messages. When new message is acquired,
  // will append to current list
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.roomCode = params['id'];
  })

    this.roomsService.setRoom(this.roomCode);
    this.roomsService.setupSocket();

    this.roomServ = this.roomsService.getNewMessage().subscribe((message: string) => {
      //this.messageList.push(message);
      this.messageList = [...this.messageList, message];
      this.virtualScrollViewport?.scrollToOffset(this.messageList.length * 100);
   });
  }

  // Called when a message is typed and send button is pressed
  // grabs message and sends to server. Clears input form
  sendMessage(form: NgForm) {
    if (form.invalid) {return;}
    this.roomsService.sendMessage(form.value.new_message);
    form.resetForm();
  }

  // Will be called when the room component is destroyed by reloading or navigating to new page
  // Unsuscribes from the room's service and reloads page so nothing is saved
  ngOnDestroy() {
    // this.postsSub.unsubscribe();
    this.roomServ.unsubscribe();
    this.roomsService.socket.removeAllListeners('chat message');
    location.reload();
  }

  getUserListLength()
  {
    return this.userList.length;
  }

  getRoomCode()
  {
    return this.roomCode;
  }
}
