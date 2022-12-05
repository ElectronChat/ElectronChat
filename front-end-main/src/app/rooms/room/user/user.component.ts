import { Component, Input } from "@angular/core";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  /**
   * @type {string}
   */
  @Input() userText!: string;
}
