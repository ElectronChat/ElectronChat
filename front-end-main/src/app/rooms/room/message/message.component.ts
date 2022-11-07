import { Component, Input } from "@angular/core";


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  ngOnInit()
  {
    console.log("in load");
    let div = document.getElementById("msg");
    if (div != null) {
      div.scrollTop = div.scrollHeight;
    }
  }
  @Input() message!: any;
}
