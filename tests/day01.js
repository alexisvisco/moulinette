const path = require('path')
const { test } = require('uvu');
const assert = require('uvu/assert');

test('d01/ex00 - Hello world', async () => {
  const { helloWorld } = require('../days/d01/ex00/index')
  assert.is(helloWorld(), 'hello world !')
})

test.run()
