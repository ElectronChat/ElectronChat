import { Component, Input } from "@angular/core";
​
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() messageText!: any;
}
