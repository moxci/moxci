const axios = require("axios");
const Octokit = require("@octokit/rest");

// used for local test
require("dotenv").config();

module.exports = async (targetPath: string) => {
  const {
    CIRCLE_PULL_REQUEST,
    CIRCLE_BUILD_NUM,
    GITHUB_TOKEN,
    CIRCLE_TOKEN,
    CIRCLE_PROJECT_USERNAME,
    CIRCLE_PROJECT_REPONAME,
    SLACK_WEBHOOK
  } = process.env;

  // Validation

  if (!CIRCLE_PROJECT_USERNAME) {
    console.error("Cannot find project username");
    return;
  }

  if (!CIRCLE_PROJECT_REPONAME) {
    console.error("Cannot find project reponame");
    return;
  }

  if (!CIRCLE_PULL_REQUEST) {
    console.error("Cannot find pull request ID");
    return;
  }

  if (!CIRCLE_BUILD_NUM) {
    console.error("Cannot find build number");
    return;
  }

  if (!GITHUB_TOKEN) {
    console.error("The environment variable GITHUB_TOKEN must be required");
    return;
  }

  if (!CIRCLE_TOKEN) {
    console.error("The environment variable CIRCLE_TOKEN must be required");
    return;
  }

  // Github

  const pullRequestId = CIRCLE_PULL_REQUEST.split("/").pop();

  interface AxiosResponse {
    data: string[];
  }

  axios
    .get(
      `https://circleci.com/api/v1.1/project/github/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_BUILD_NUM}/artifacts?circle-token=${CIRCLE_TOKEN}`
    )
    .then(({ data }: AxiosResponse) => data)
    .then(
      (artifacts: Array<any>) =>
        artifacts.filter((artifact: any) =>
          artifact.path.includes(targetPath)
        )[0]
    )
    .then((artifact: any) => {
      if (!artifact) {
        throw new Error(`Cannot find any artifacts with: ${targetPath}`);
      }

      // Slack
      if (SLACK_WEBHOOK) {
        try {
          axios.post(SLACK_WEBHOOK, {
            attachments: [
              {
                title: "Your Artifact is Here!",
                text: `New artifact arrived from *CircleCI.* \n Your Artifact can be viewed here:\n${
                  artifact.url
                }`
              }
            ]
          });
        } catch (error) {
          console.log("error:", error);
        }
      } else {
        console.log("slack webhook or slack channel is not set");
      }

      const octokit = new Octokit({ auth: `token ${GITHUB_TOKEN}` });
      return octokit.issues.createComment({
        owner: CIRCLE_PROJECT_USERNAME,
        repo: CIRCLE_PROJECT_REPONAME,
        number: pullRequestId,
        body: `Artifact can be viewed here:\n${artifact.url}`
      });
    });
};
