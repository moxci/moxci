import yargs from "yargs";
// @ts-ignore
import { name, version, repository } from "../../package.json";

const cmd = yargs
  .scriptName(name)
  .version(version)
  .command("[path]", "Notifies given artifact to github pr", yargs => {
    yargs.positional("path", {
      describe: "Path to artifact"
    });
  })
  .option("message", {
    alias: "m",
    type: "string",
    default: "Artifact can be viewed here: ",
    description: "Message to be displayed in the github comment"
  })
  .option("slack_message", {
    alias: "s",
    type: "string",
    default: "",
    description: "Message to be displayed in the Slack notification"
  })
  .options("label", {
    alias: "l",
    type: "string",
    default: "Artifact",
    description:
      "Label to be used for your commit status check. If you're using multiple artifacts in your project, you will need to set different label for each artifact in order to allow status check for all the artifacts."
  })
  .example(
    "$0 /path/to/artifact/index.html",
    "Notifies given artifact to github pull request and Slack channel"
  )
  .example(
    '$0 /path/to/artifact/myAwesomeApp.jar -m "Built package can be downloaded at:"',
    "With a custom message (send to both GitHub & Slack)"
  )
  .example(
    '$0 /path/to/artifact/index.html -s "Test report can be viewed at:"',
    "With a custom Slack notification message"
  )
  .example(
    '$0 /path/to/artifact/index.html -m "Please check the test report: " -s "Test report can be viewed at:"',
    "With a custom GitHub PR message and a custom Slack notification message"
  )
  .epilogue(
    `For more information, please visit our repository at:\nhttps://github.com/${repository}`
  );

export const parse = cmd.parse;
