import { Component, Input } from "@angular/core";


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  ngOnInit()
  {
    let div = document.getElementById("msg");
    if (div != null) {
      console.log("in load");
      div.scrollTop = div.scrollHeight;
    }
  }
  ngAfterViewChecked()
  {
    let div = document.getElementById("msg");
    if (div != null) {
      console.log("in load");
      div.scrollTop = div.scrollHeight;
    }
  }
  @Input() message!: any;
  @Input() myId!: any;
}
