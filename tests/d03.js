const { test } = require('uvu');
const assert = require('uvu/assert');
const { captureOutput, desc } = require('./utils')

const eggs = { flag: 1, name: 'eggs' }
const peanuts = { flag: 2, name: 'peanuts' }
const shellfish = { flag: 4, name: 'shellfish' }
const strawberries = { flag: 8, name: 'strawberries' }
const tomatoes = { flag: 16, name: 'tomatoes' }
const chocolate = { flag: 32, name: 'chocolate' }
const pollen = { flag: 64, name: 'pollen' }
const cats = { flag: 128, name: 'cats' }
const ignore = { flag: 128 << 2, name: 'ignore' }

test('d03/ex00 - Allergies from score', async () => {
  const { allergies } = require('./days/d03/ex00')

  assert.equal(allergies(peanuts.flag | chocolate.flag), ['peanuts', 'chocolate'],
    `tested with value ${peanuts.flag | chocolate.flag}`)

  assert.equal(allergies(eggs.flag | cats.flag | pollen.flag), ['eggs', 'pollen', 'cats'],
    `tested with value ${eggs.flag | cats.flag | pollen.flag}`)

  assert.equal(allergies(eggs.flag | ignore), ['eggs'],
    `tested with value ${eggs.flag}`)

  assert.equal(allergies(257), ['eggs'],
    `tested with value ${257}`)
})

test('d03/ex01 - Score from allergies', async () => {
  const { score } = require('./days/d03/ex01')


  assert.equal(score([eggs.flag, pollen.flag]), 0b1000001,
    `tested with value ${[eggs.flag, pollen.flag]}`)

  assert.equal(score([tomatoes.flag, 73892]), 0b10000,
    `tested with value ${[tomatoes.flag, 73892]}`)

  assert.equal(score([shellfish.flag, strawberries.flag, peanuts.flag]), 0b1110,
    `tested with value ${[shellfish.flag, strawberries.flag, peanuts.flag]}`)

  assert.equal(score([]), 0,
    `tested with value ${[]}`)

  assert.equal(score([349237]), 0,
    `tested with value ${[349237]}`)
})

test('d03/ex02 - Simple bloom filter', async () => {
  const { BloomFilter } = require('./days/d03/ex02')

  const bloom = new BloomFilter(['alexis@outlook.fr', 'b'])

  assert.equal(bloom.bits.toString(2), '100000000000000000000100')

  assert.equal(bloom.maybePresent("alexis@outlook.fr"), true, 'test with alexis@outlook.fr')
  assert.equal(bloom.bits.toString(2), '100000000000000000000100')

  assert.equal(bloom.maybePresent("s6no"), true, 'test with s6no')
  assert.equal(bloom.bits.toString(2), '100000000000000000000100')

  assert.equal(bloom.maybePresent("s7vl"), false, 'test with s7vl')
  assert.equal(bloom.bits.toString(2), '1000000100000000000000000000100')

  bloom.reset()
  assert.equal(bloom.bits, 0)
})

test('d03/ex03 - Matching bracket', async () => {
  const { isPaired } = require('./days/d03/ex03')

  desc('paired square brackets', () => {
    assert.equal(isPaired('[]'), true, 'tested with []');
  });

  desc('empty string', () => {
    assert.equal(isPaired(''), true, 'tested with empty string');
  });

  desc('unpaired brackets', () => {
    assert.equal(isPaired('[['), false, 'tested with [[');
  });

  desc('wrong ordered brackets', () => {
    assert.equal(isPaired('}{'), false, 'tested with }{');
  });

  desc('wrong closing bracket', () => {
    assert.equal(isPaired('{]'), false, 'tested with {]');
  });


  desc('partially paired brackets', () => {
    assert.equal(isPaired('{[])'), false, 'tested with {[])');
  });

  desc('simple nested brackets', () => {
    assert.equal(isPaired('{[]}'), true, 'tested with {[]}');
  });

  desc('several paired brackets', () => {
    assert.equal(isPaired('{}[]'), true, 'tested with {}[]');
  });

  desc('paired and nested brackets', () => {
    assert.equal(isPaired('([{}({}[])])'), true, 'tested with ([{}({}[])])');
  });

  desc('unopened closing brackets', () => {
    assert.equal(isPaired('{[)][]}'), false, 'tested with {[)][]}');
  });

  desc('unpaired and nested brackets', () => {
    assert.equal(isPaired('([{])'), false, 'tested with ([{])');
  });

  desc('paired and wrong nested brackets', () => {
    assert.equal(isPaired('[({]})'), false, 'tested with [({]})');
  });

  desc('paired and incomplete brackets', () => {
    assert.equal(isPaired('{}['), false, 'tested with {}[');
  });

  desc('too many closing brackets', () => {
    assert.equal(isPaired('[]]'), false, 'tested with []]');
  });
})

test('d03/ex04 - Run length encoding', async () => {
  const { encode, decode } = require('./days/d03/ex04')

  desc('encode empty string', () => {
    assert.equal(encode(''), (''), 'tested with empty string');
  });

  desc('single characters only are encoded without count', () => {
    assert.equal(encode('XYZ'), ('XYZ'), 'tested with XYZ');
  });

  desc('encode string with no single characters', () => {
    assert.equal(encode('AABBBCCCC'), ('2A3B4C'), 'tested with AABBBCCCC');
  });

  desc('encode string with single characters mixed with repeated characters', () => {
    assert.equal(
      encode('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB')
    , ('12WB12W3B24WB'), 'tested with WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB');
  });

  desc('encode string with multiple whitespaces', () => {
    assert.equal(encode('  hsqq qww  '), ('2 hs2q q2w2 '), `tested with  '  hsqq qww  '`);
  });

  desc('encode string with lowercase characters', () => {
    assert.equal(encode('aabbbcccc'), ('2a3b4c'), 'tested with aabbbcccc');
  });

  desc('decode empty string', () => {
    assert.equal(decode(''),'', 'tested with empty string');
  });

  desc('decode string with single characters only', () => {
    assert.equal(decode('XYZ'),'XYZ', 'tested with XYZ');
  });

  desc('decode string with no single characters', () => {
    assert.equal(decode('2A3B4C'),'AABBBCCCC', 'tested with 2A3B4C');
  });

  desc('decode string with single characters mixed with repeated characters', () => {
    assert.equal(decode('12WB12W3B24WB'),
      'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB', 'tested with 12WB12W3B24WB'
    );
  });

  desc('decode string with multiple whitespaces', () => {
    assert.equal(decode('2 hs2q q2w2 '),'  hsqq qww  ', `tested with '2 hs2q q2w2 '`);
  });

  desc('decode string with lowercase characters', () => {
    assert.equal(decode('2a3b4c'),'aabbbcccc', 'tested with 2a3b4c');
  });
})


test.run()
