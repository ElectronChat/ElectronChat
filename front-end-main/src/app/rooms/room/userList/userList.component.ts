import { Component, Input, ViewChild} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent {
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;
  @Input() userList!: string[];
  constructor() {}
}
