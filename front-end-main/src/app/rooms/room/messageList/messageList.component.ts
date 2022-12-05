import { Component, Input, ViewChild} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'message-list',
  templateUrl: './messageList.component.html',
  styleUrls: ['./messageList.component.css']
})
export class MessageListComponent {
  /**
   * @type {ViewChild}
   */
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;

  /**
   * @type {string[]}
   */
  @Input() messageList!: string[];

  /**
   * @type {int}
  */
  @Input() myId!: any;
  constructor() {}
}
