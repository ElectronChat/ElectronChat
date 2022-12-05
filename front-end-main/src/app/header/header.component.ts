import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() roomsService!: any;

  /**
   * Emits to roomService a disconnection before rerouting to link
   * @param link a string param which correlates to a new route
   *
   */
  loadLink(link: string){
    if (this.roomsService)
    {
      this.roomsService.emitDisconnection();
    }
    window.location.href = link;
  }
}
