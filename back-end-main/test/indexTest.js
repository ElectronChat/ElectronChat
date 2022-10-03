const assert = require('chai').assert;
const index = require('../index');

describe('Index ', function(){
  it('index should return hello', function(){
    assert.equal(index(), 'hello');
  })
})
