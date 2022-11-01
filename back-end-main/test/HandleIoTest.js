const assert = require('chai').assert;
const express = require('express');
const {server, Server} = require('socket.io');

const HandleIo = require('../app/Models/HandleIo');
const IoNotification = require('../app/Models/IoNotification');
const http = require("http");

describe('HandleIo', function(){
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const handler = new HandleIo(io);

  describe('listen', function(){
    it('listen should', function(){

    })
  })

  describe('CreateRoom', function(){
    it('CreateRoom should return "roomID : Room Created!"', function(){
        testId = 123;
        return_var = handler.CreateRoom(new IoNotification("CREATEROOM", testId));

        assert.equal(return_var, '{$roomID} : Room Created!');
    })
  })

  describe('UserJoin', function(){
    it('UserJoin should return "user Joined the room!"', function(){
        user = "Joe";
        return_var = handler.UserJoin(new IoNotification("USERJOIN", user))

        assert.equal(return_var, '{user} Joined the room!');
    })
  })

  describe('MessageRecieved', function(){
    it('MessageRecieved should return "Message: {userMessage}"', function(){
        let message = "test message"
        let return_var = handler.MessageRecieved(new IoNotification("NEWMESSAGE", message))

        assert.equal(return_var, 'Message: test message');
    })
  })

  // Testing error, GetMessage should return "error"
  describe('notify', function(){
    it('notify should return requested Handle, this case error', function(){
        notification = handler.notify(new IoNotification("ERROR", "test"))
        return_var = notification.GetMessage();

        assert.equal(return_var, 'error');
    })
  })

})
