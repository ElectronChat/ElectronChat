import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = "ElectronChat";
}
