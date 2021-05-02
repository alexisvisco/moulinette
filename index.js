const core = require('@actions/core');
const github = require('@actions/github');
const { test } = require('uvu');


const days = [
  'd01',
  'd02',
  'd03',
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
      require('./tests/d01');
      break
    case 'd02':
      require('./tests/d02');
      break
    case 'd03':
      require('./tests/d03');
      break
  }
} catch (ex) {
  core.setFailed(ex.message);
}
