import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule, ArrayOfComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { RoomCreateJoinComponent } from './rooms/room-create-join/room-create-join.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './rooms/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArrayOfComponents,
    RoomCreateJoinComponent,
    HeaderComponent,
    PostListComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
