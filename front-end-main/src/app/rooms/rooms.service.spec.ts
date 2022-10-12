import { RoomsService } from "./rooms.service";
import { RoomCreateJoin } from "./room-create-join.model";
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoomsService', () => {

  it ('rooms should initially be empty', () => {
    let comp = new RoomsService();

    expect(comp.getRooms()).toEqual([]);

    // comp.sendMessage()
  });

  it ('should update RoomsService with new rooms with interfaces listed', () => {
    let comp = new RoomsService();
    expect(comp.getRooms()).toEqual([]);
    comp.createRoom("ABC");
    expect(comp.getRooms()[0].roomCode).toEqual("ABC");

  });

});
