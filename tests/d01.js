const { test } = require('uvu');
const assert = require('uvu/assert');
const { captureOutput } = require('./utils')

var fs = require('fs');
var files = fs.readdirSync('./days');

console.log(process.env.PWD)

console.log("pwd", process.env.PWD)
files.forEach(f => console.log("FILE: ", f))

// files2.forEach(f => console.log("FILE2: ", f))

test('d01/ex00 - Hello world', async () => {
  const { helloWorld } = require('./days/d01/ex00.js')
  assert.is(captureOutput(() => helloWorld()), 'Hello world !\n')
})

test('d01/ex01 - Print alphabet', async () => {
  const { printAlphabet } = require('./days/d01/ex01')

  assert.is(captureOutput(() => printAlphabet(false)), 'abcdefghijklmnopqrstuvwxyz\n')
  assert.is(captureOutput(() => printAlphabet(true)), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n')
})

test('d01/ex02 - Print alphabet reversed', async () => {
  const { printAlphabetReversed } = require('./days/d01/ex02')

  assert.is(captureOutput(() => printAlphabetReversed(false, false)), 'abcdefghijklmnopqrstuvwxyz\n')
  assert.is(captureOutput(() => printAlphabetReversed(true, false)), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ\n')

  assert.is(captureOutput(() => printAlphabetReversed(false, true)), 'zyxwvutsrqponmlkjihgfedcba\n')
  assert.is(captureOutput(() => printAlphabetReversed(true, true)), 'ZYXWVUTSRQPONMLKJIHGFEDCBA\n')
})

test('d01/ex03 - Print all digits N times', async () => {
  const { printAllDigitsNTimes } = require('./days/d01/ex03')

  assert.is(captureOutput(() => printAllDigitsNTimes(0)), '')
  assert.is(captureOutput(() => printAllDigitsNTimes(2)), '0123456789\n0123456789\n')
  assert.is(captureOutput(() => printAllDigitsNTimes(8)), '0123456789\n0123456789\n0123456789\n0123456789\n0123456789\n0123456789\n0123456789\n0123456789\n')
})

test('d01/ex04 - Is negative', async () => {
  const { isNegative } = require('./days/d01/ex04')

  assert.is(isNegative(1), false)
  assert.is(isNegative(0), false)
  assert.is(isNegative(-1), true)
})

test('d01/ex05 - Print comb', async () => {
  const { printComb } = require('./days/d01/ex05')

  assert.is(captureOutput((() => printComb())), `012
013
014
015
016
017
018
019
023
024
025
026
027
028
029
034
035
036
037
038
039
045
046
047
048
049
056
057
058
059
067
068
069
078
079
089
123
124
125
126
127
128
129
134
135
136
137
138
139
145
146
147
148
149
156
157
158
159
167
168
169
178
179
189
234
235
236
237
238
239
245
246
247
248
249
256
257
258
259
267
268
269
278
279
289
345
346
347
348
349
356
357
358
359
367
368
369
378
379
389
456
457
458
459
467
468
469
478
479
489
567
568
569
578
579
589
678
679
689
789
`)
})

test('d01/ex06 - Reverse string', async () => {
  const { reverseString } = require('./days/d01/ex06')

  assert.is(reverseString("bobe"), "ebob")
  assert.is(reverseString("bobé"), "ébob")
  assert.is(reverseString("is is the end"), "dne eht si si")
})

test.run()
