import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() roomsService!: any;

  loadLink(link: string){
    console.log("bue");
    if (this.roomsService)
    {
      this.roomsService.emitDisconnection();
    }
    window.location.href = link;
  }
}
