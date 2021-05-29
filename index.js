const core = require('@actions/core');
const github = require('@actions/github');
const { test } = require('uvu');


const days = [
  'd01',
  'D01',
  'd02',
  'D02',
  'd03',
  'D03',
]

try {
  if (!github.context.payload || !github.context.payload.pull_request) {
    core.setFailed('not a pull request');
    return
  }

  const title = github.context.payload.pull_request.title

  if (!title) {
    core.setFailed('not a pull request a missing title');
    return
  }

  if (!days.includes(title)) {
    core.setFailed('the title of the pull request must be one of : ' + days.join(', '));
    return
  }

  switch (title) {
    case 'd01':
    case 'D01':
      require('./tests/d01');
      break
    case 'd02':
    case 'D02':
      require('./tests/d02');
      break
    case 'd03':
    case 'D03':
      require('./tests/d03');
      break
  }
} catch (ex) {
  core.setFailed(ex.message);
}
