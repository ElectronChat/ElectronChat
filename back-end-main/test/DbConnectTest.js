const assert = require('chai').assert;
const DbConnect = require('../app/Models/DbConnect');
const interface = require('../app/Models/SqlInterface_mock')
describe('DbConnector', function() {
    const ip = '127.0.0.1';
    const port = '8080';
    let inter = new interface(port,ip);
    let connector = new DbConnect(inter);

    describe("getPort", function() {
      it('getPort should return 8080', function(){
        assert.equal(connector.getPort(), '8080');
      })
    })

    describe("getIp", function() {
      it('getIP should return 127.0.0.1', function(){
        assert.equal(connector.getIp(), '127.0.0.1');
      })
    })

    describe("getAllMsgs", function() {
      it('getALLMsgs should return true', function(){
        assert.equal(connector.getAllMsgs('hello_world').length, 8);
      })
    })

    describe("getMsg", function() {
      it('getMsgs should return true', function(){
        assert.equal(connector.getMsg(), true);
      })
    })

    describe("sendMsg", function() {
      it('sendMsg should return true', function(){
        assert.equal(connector.sendMsg(), true);
      })
    })

    describe("deleteMsg", function() {
      it('deleteMsg should return true', function(){
        assert.equal(connector.deleteMsg(), true);
      })
    })
})
