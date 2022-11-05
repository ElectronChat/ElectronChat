const Message = require('../app/Models/Message');
const {assert} = require("chai");
const name = 'Jimmy';
const msg = 'yo yo';
const socketId = 21383171923;
const message = new Message(name,msg,socketId)

describe('Message', function() {

    describe('getMessage',function (){
        it('getMessage should return yo yo', function(){
            assert.equal(message.getMessage(), 'yo yo');
        })

    })

    describe('getName',function (){
        it('getName should return Jimmy', function(){
            assert.equal(message.getName(), 'Jimmy');
        })

    })

    describe('getSocketId',function (){
        it('getSocketId should return 21383171923', function(){
            assert.equal(message.getSocketId(), '21383171923');
        })

    })

    }
)