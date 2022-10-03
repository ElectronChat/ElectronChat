import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomCreateJoinComponent } from './rooms/room-create-join/room-create-join.component';
import { Room } from './rooms/room/room.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component:RoomCreateJoinComponent},
  {path: 'room', component:Room}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [ RoomCreateJoinComponent, RoomCreateJoinComponent ];
