import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { RoomCreateJoinComponent } from './rooms/room-create-join/room-create-join.component';
import { RoomComponent } from './rooms/room/room.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component:RoomCreateJoinComponent},
  {path: 'room/:id', component:RoomComponent},
  {path: 'about-us', component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [ RoomCreateJoinComponent, RoomCreateJoinComponent ];
