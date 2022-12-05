import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../../rooms.service';

@Component ( {
  selector: 'room-banner',
  templateUrl: './roomBanner.component.html',
  styleUrls: ['./roomBanner.component.css']
})
export class RoomBannerComponent {
  /**
   * @type {int}
   */
  @Input() numUsers!: any;

  /**
   * @type {string}
   */
  @Input() roomCode!: any;

  /**
   * @type {RoomsService}
   */
  @Input() roomsService!: any;

  constructor(private _router: Router) {}

  /**
   * disconnects user by navigating to the home page
   */
  public disconnectUser()
  {
    if (this.roomsService != null)
    {
      this._router.navigateByUrl(`/home`);
    }
  }
}
