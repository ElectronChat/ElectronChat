const assert = require('chai').assert;
const IoNotification = require('../app/Models/DbConnect');

descripe('IoNotification', function(){

  describe("GetMessage", function() {
    test_object = "test"
    notification = new IoNotification("NEWMESSAGE", test_object);
    return_var = notification.GetMessage();

    it('GetMessage should return "Message: {userMessage}"', function(){
      assert.equal(return_var, 'Message: test');
    })
  })
})
