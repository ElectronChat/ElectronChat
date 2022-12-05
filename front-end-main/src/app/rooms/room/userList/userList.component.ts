import { Component, Input, ViewChild} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})
export class UserListComponent {
  /**
   * @type {ViewChild(CdkVirtualScrollViewport)}
   */
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;

  /**
   * @type {string[]}
   */
  @Input() userList!: string[];

  constructor() {}
}
