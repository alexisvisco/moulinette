const core = require('@actions/core');
const github = require('@actions/github');


try {
  console.log("this is a funky test")
  console.log(github.context)
  console.log(core.getInput('pr_name'))
} catch (ex) {
  core.setFailed(ex.message);
}
