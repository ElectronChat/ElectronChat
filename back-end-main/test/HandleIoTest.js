const assert = require('chai').assert;
const express = require('express');
const {server} = require('socket.io');

const HandleIo = require('../app/Models/HandleIo');
const IoNotification = require('../app/Models/IoNotification');

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
        return_var = HandleIo.notify(new IoNotification("CREATEROOM", testId));

        assert.equal(return_var, '{roomID} : Room Created!');
    })
  })

  describe('UserJoin', function(){
    it('UserJoin should return "user Joined the room!"', function(){
        user = "Joe";
        return_var = HandleIo.notify(new IoNotification("USERJOIN", user))

        assert.equal(return_var, '{user} Joined the room!');
    })
  })

  describe('MessageRecieved', function(){
    it('MessageRecieved should return "Message: {userMessage}"', function(){
        message = "test message"
        return_var = HandleIo.notify(new IoNotification("NEWMESSAGE", message))

        assert.equal(return_var, 'Message: test message');
    })
  })

  // Testing error, GetMessage should return "error"
  describe('notify', function(){
    it('notify should return requested Handle, this case error', function(){
        notification = HandleIo.notify(new IoNotification("ERROR", "test"))
        return_var = notification.GetMessage();

        assert.equal(return_var, 'error');
    })
  })

})
