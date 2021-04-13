const core = require('@actions/core');
const github = require('@actions/github');


const daysAndRushes = [
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

const exercicesPerDayOrRush = {
  'd01': [
    { fn: 'ex00', file: 'days/d01/ex00/index.js' }
  ]
}

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

  if (!daysAndRushes.includes(title)) {
    core.setFailed('the title of the pull request must be one of : ' + daysAndRushes.join(','));
    return
  }

  const exercices = exercicesPerDayOrRush[title]
  const test = require(`tests/${title}.js`)

  Promise.all(exercices.map(f => {
    console.log(f.fn, f.file)
    test[f.fn](f.file)
  }))
    .then(e => console.log('ok'))
    .catch(err => core.setFailed(err))

} catch (ex) {
  core.setFailed(ex.message);
}
