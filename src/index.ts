import { notifySlack } from "./slack-notify";
import { getArtifactUrl } from "./get-artifact";
import { notifyGithubPr } from "./github-notify";

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

  if (!CIRCLE_TOKEN) {
    console.error("The environment variable CIRCLE_TOKEN must be required");
    return;
  }

  const circleciApiUrl = `https://circleci.com/api/v1.1/project/github/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_BUILD_NUM}/artifacts?circle-token=${CIRCLE_TOKEN}`;
  const artifactUrl = await getArtifactUrl(circleciApiUrl, targetPath);

  // Slack
  if (SLACK_WEBHOOK) {
    notifySlack(SLACK_WEBHOOK, artifactUrl);
  } else {
    console.log("Slack webhook is not set or invalid");
  }

  // Github
  if (GITHUB_TOKEN) {
    const pullRequestId = CIRCLE_PULL_REQUEST.split("/").pop();
    if (!pullRequestId) {
      console.error("Invalid Pull Request Id");
      return;
    }
    notifyGithubPr(
      CIRCLE_PROJECT_USERNAME,
      CIRCLE_PROJECT_REPONAME,
      pullRequestId,
      GITHUB_TOKEN,
      artifactUrl
    );
  } else {
    console.log("Github Token is not set or invalid");
  }
};
