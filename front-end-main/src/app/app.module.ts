import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling'

import { AppRoutingModule, ArrayOfComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { RoomCreateJoinComponent } from './rooms/room-create-join/room-create-join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { RoomComponent } from './rooms/room/room.component';
import { MessageComponent } from './rooms/room/message/message.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { UserComponent } from './rooms/room/user/user.component';
import { UserListComponent } from './rooms/room/userList/userList.component';
import { MessageListComponent } from './rooms/room/messageList/messageList.component';
import { RoomBannerComponent } from './rooms/room/roomBanner/roomBanner.component';
import { AboutUsComponent } from './aboutUs/aboutUs.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayOfComponents,
    RoomCreateJoinComponent,
    HeaderComponent,
    RoomComponent,
    MessageComponent,
    UserComponent,
    UserListComponent,
    MessageListComponent,
    RoomBannerComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    ScrollingModule
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
