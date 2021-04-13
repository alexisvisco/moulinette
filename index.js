const core = require('@actions/core');
const github = require('@actions/github');


try {
  console.log("this is a funky test")
  core.setOutput("context", github.context)
  core.setOutput("pr_name", core.getInput('pr_name'))
} catch (ex) {
  core.setFailed(ex.message);
}
