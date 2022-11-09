import { Component, Input, ViewChild} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component ( {
  selector: 'message-list',
  templateUrl: './messageList.component.html',
  styleUrls: ['./messageList.component.css']
})
export class MessageListComponent {
  @ViewChild(CdkVirtualScrollViewport) public virtualScrollViewport?: CdkVirtualScrollViewport;
  @Input() messageList!: string[];
  @Input() myId!: any;
  constructor() {}
}
