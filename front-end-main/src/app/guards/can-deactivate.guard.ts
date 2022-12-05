import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import { RoomComponent } from '../rooms/room/room.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<RoomComponent> {

  /**
   *
   * @param component
   * @param currentRoute
   * @param currentState
   * @param nextState
   * @returns check if component can exit
   */
  canDeactivate(component: RoomComponent, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
      return component.canExit();
    }
}
