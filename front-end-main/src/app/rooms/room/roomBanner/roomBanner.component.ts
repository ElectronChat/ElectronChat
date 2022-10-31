import { Component, Input} from '@angular/core';

@Component ( {
  selector: 'room-banner',
  templateUrl: './roomBanner.component.html',
  styleUrls: ['./roomBanner.component.css']
})
export class RoomBannerComponent {
  @Input() numUsers!: any;
  @Input() roomCode!: any;
}
