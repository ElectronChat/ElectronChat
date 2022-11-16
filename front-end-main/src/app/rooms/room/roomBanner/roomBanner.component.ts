import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component ( {
  selector: 'room-banner',
  templateUrl: './roomBanner.component.html',
  styleUrls: ['./roomBanner.component.css']
})
export class RoomBannerComponent {
  @Input() numUsers!: any;
  @Input() roomCode!: any;
  @Input() roomsService!: any;

  constructor(private _router: Router) {}

  public disconnectUser()
  {
    if (this.roomsService != null)
    {
      //this.roomsService.emitDisconnection();
      this._router.navigateByUrl(`/home`);
    }
  }
}
