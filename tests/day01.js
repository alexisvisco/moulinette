const path = require('path')
const { test } = require('uvu');
const assert = require('uvu/assert');

module.exports = {
  ex00(file) {
    test('helloWorld', async () => {

      const { helloWorld } = require(path.join('../', file))

      assert.is(helloWorld(), 'hello world !')
    })
  }
}
