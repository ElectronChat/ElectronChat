import { Component, Input } from "@angular/core";


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  /**
   * On component imitialization
   * grabs element with msg tag and sets the scroll height
   */
  ngOnInit()
  {
    let div = document.getElementById("msg");
    if (div != null) {
      div.scrollTop = div.scrollHeight;
    }
  }
  /**
   * after the view is checked
   */
  ngAfterViewChecked()
  {
    let div = document.getElementById("msg");
    if (div != null) {
      div.scrollTop = div.scrollHeight;
    }
  }

  /**
   * @type {string}
   */
  @Input() message!: any;

  /**
   * @type {int}
   */
  @Input() myId!: any;
}
