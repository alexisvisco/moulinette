const { test } = require('uvu');
const assert = require('uvu/assert');
const { captureOutput, desc } = require('./utils')

test('d02/ex00 - Basic atoi', async () => {
  const { basicAtoi } = require('./days/d02/ex00')
  assert.is(basicAtoi('123'), 123, 'tested with 123')
  assert.is(basicAtoi('000123'), 123, 'tested with 000123')
  assert.is(basicAtoi('000101293748'), 101293748, 'tested with 000101293748')
  assert.is(basicAtoi('09'), 9, 'tested with 09')
})

test('d02/ex01 - Div mod', async () => {
  const { divMod } = require('./days/d02/ex01')
  assert.equal(divMod(13, 2), { div: 6, mod: 1 })
  assert.equal(divMod(15, 2), { div: 7, mod: 1 })
})

test('d02/ex02 - Swap', async () => {
  const { swap } = require('./days/d02/ex02')
  const ref1 = { a: 1 }
  const ref2 = { a: 5 }

  swap(ref1, ref2)

  assert.equal(ref1.a, 5)
  assert.equal(ref2.a, 1)
})


test('d02/ex03 - Sort integer', async () => {
  const { sortInteger } = require('./days/d02/ex03')

  assert.equal(sortInteger([1]), [1])
  assert.equal(sortInteger([]), [])
  assert.equal(sortInteger([6, 0, 3]), [0, 3, 6])
  assert.equal(sortInteger([-82, 83, 3, 1, 10, 100]), [-82, 1, 3, 10, 83, 100])
})

test('d02/ex04 - RNA Transcription', async () => {
  const { toRna } = require('./days/d02/ex04')

  assert.equal(toRna(''), '');

  assert.equal(toRna('C'), 'G');

  assert.equal(toRna('G'), 'C');

  assert.equal(toRna('T'), 'A');

  assert.equal(toRna('A'), 'U');

  assert.equal(toRna('ACGTGGTCTTAA'), 'UGCACCAGAAUU');
})

test('d02/ex05 - Bank account', async () => {
  const { BankAccount, ValueError } = require('./days/d02/ex05')

  desc('newly opened account has zero balance', () => {
    const account = new BankAccount();
    account.open();
    assert.equal(account.balance, (0));
  });

  desc('can deposit money', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(100);
    assert.equal(account.balance, 100);
  });

  desc('can deposit money sequentially', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(100);
    account.deposit(50);
    assert.equal(account.balance, 150);
  });

  desc('can withdraw money', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(100);
    account.withdraw(50);
    assert.equal(account.balance, 50);
  });

  desc('can withdraw money sequentially', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(100);
    account.withdraw(20);
    account.withdraw(80);
    assert.equal(account.balance, 0);
  });

  desc('checking balance of closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();

    assert.throws(() => account.balance)
  });

  desc('deposit into closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();
    assert.throws(() => account.balance)
  });

  desc('withdraw from closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();

    assert.throws(() => account.withdraw(50))
  });

  desc('close already closed account throws error', () => {
    const account = new BankAccount();

    assert.throws(() => account.close())
  });

  desc('open already opened account throws error', () => {
    const account = new BankAccount();
    account.open();
    assert.throws(() => account.open())
  });

  desc('reopened account does not retain balance', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(50);
    account.close();
    account.open();
    assert.equal(account.balance, 0);
  });

  desc('cannot withdraw more than deposited', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(25);
    assert.throws(() => account.withdraw(50))
  });

  desc('cannot withdraw negative amount', () => {
    const account = new BankAccount();
    account.open();
    account.deposit(100);
    assert.throws(() => account.withdraw(-50))
  });

  desc('cannot deposit negative amount', () => {
    const account = new BankAccount();
    account.open();
    assert.throws(() => account.deposit(-50))
  });
})


test('d02/ex06 - Keep and discard', async () => {
  const { keep, discard } = require('./days/d02/ex06')

  desc('keeps on empty array returns empty array', () => {
    assert.equal(keep([], (e) => e < 10), []);
  });

  desc('keeps everything ', () => {
    assert.equal(keep([1, 2, 3], (e) => e < 10), [1, 2, 3]);
  });

  desc('keeps first and last', () => {
    assert.equal(keep([1, 2, 3], (e) => e % 2 === 1), [1, 3]);
  });

  desc('keeps neither first nor last', () => {
    assert.equal(keep([1, 2, 3, 4, 5], (e) => e % 2 === 0), [2, 4]);
  });

  desc('keeps strings', () => {
    const words = 'apple zebra banana zombies cherimoya zelot'.split(' ');
    const result = keep(words, (word) => word.indexOf('z') === 0);
    assert.equal(result, 'zebra zombies zelot'.split(' '));
  });

  desc('keeps arrays', () => {
    const rows = [
      [1, 2, 3],
      [5, 5, 5],
      [5, 1, 2],
      [2, 1, 2],
      [1, 5, 2],
      [2, 2, 1],
      [1, 2, 5],
    ];
    const result = keep(rows, (row) => row.indexOf(5) > -1);
    assert.equal(result, [
      [5, 5, 5],
      [5, 1, 2],
      [1, 5, 2],
      [1, 2, 5],
    ]);
  });

  desc('empty discard', () => {
    assert.equal(discard([], (e) => e < 10), []);
  });

  desc('discards nothing', () => {
    assert.equal(discard([1, 2, 3], (e) => e > 10), [1, 2, 3]);
  });

  desc('discards first and last', () => {
    assert.equal(discard([1, 2, 3], (e) => e % 2 === 1), [2]);
  });

  desc('discards neither first nor last', () => {
    const result = discard([1, 2, 3, 4, 5], (e) => e % 2 === 0);
    assert.equal(result, [1, 3, 5]);
  });

  desc('discards strings', () => {
    const words = 'apple zebra banana zombies cherimoya zelot'.split(' ');
    const result = discard(words, (word) => word.indexOf('z') === 0);
    assert.equal(result, 'apple banana cherimoya'.split(' '));
  });

  desc('discards arrays', () => {
    const rows = [
      [1, 2, 3],
      [5, 5, 5],
      [5, 1, 2],
      [2, 1, 2],
      [1, 5, 2],
      [2, 2, 1],
      [1, 2, 5],
    ];
    const result = discard(rows, (row) => row.indexOf(5) > -1);
    assert.equal(result, [
      [1, 2, 3],
      [2, 1, 2],
      [2, 2, 1],
    ]);
  });
})


test.run()
