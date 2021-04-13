const core = require('@actions/core');
const github = require('@actions/github');


const validTitles = [
  'd01',
  'd02',
  'd03',
  'd04',
  'd05',
  'd06',
  'r00',
  'd07',
  'd08',
  'd08',
  'r01',
]

try {

  if (github.context.payload && github.context.payload.pull_request) {
    core.setFailed('not a pull request');
    return
  }
  const title = github.context.payload.pull_request.title

  if (!title) {
    core.setFailed('not a pull request a missing title');
    return
  }

  if (!validTitles.includes(title)) {
    core.setFailed('the title of the pull request must be one of : ' + validTitles.join(','));
    return
  }

  console.log('Testing: ', title)

  const fs = require('fs');
  const files = fs.readdirSync('');

  files.forEach(e => console.log(e))


} catch (ex) {
  core.setFailed(ex.message);
}
