import { Component, ViewChild} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent {
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;

  userList: string[] = ["Jamewfewfewfewfewfewfewfewfwes","Hellooeowfofoefeowfoew", "Philip", "Semaj", "Pilihp", "Henry", "Zac", "Paul", "George", "Lenoard", "Harry"];

  constructor() {}

  getUserListLength()
  {
    return this.userList.length;
  }
}
