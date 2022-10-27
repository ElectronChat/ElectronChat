import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "ElectronChat";
  subscription: Subscription;

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
        if (event instanceof onanimationstart) {
          browserRefresh = !router.navigated;
        }
    });
  }
}
