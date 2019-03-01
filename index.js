const fetch = require("node-fetch");
const octokit = require("@octokit/rest");

module.exports = async () => {
  const {
    CIRCLE_PULL_REQUEST,
    CIRCLE_BUILD_NUM,
    GITHUB_TOKEN,
    CIRCLE_TOKEN,
    CIRCLE_PROJECT_USERNAME,
    CIRCLE_PROJECT_REPONAME,
    SLACK_WEBHOOK,
    SLACK_CHANNEL
  } = process.env;

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

  const pullRequestId = CIRCLE_PULL_REQUEST.split("/").pop(-1);

  fetch(
    `https://circleci.com/api/v1.1/project/github/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/${CIRCLE_BUILD_NUM}/artifacts?circle-token=${CIRCLE_TOKEN}`
  )
    .then(res => res.json())
    .then(
      artifacts =>
        artifacts.filter(artifact => artifact.path.includes(targetPath))[0]
    )
    .then(artifact => {
      if (!artifact) {
        throw new Error(`Cannot find any artifacts with: ${targetPath}`);
      }

      // Slack
      if (SLACK_WEBHOOK && SLACK_CHANNEL) {
        try {
          await fetch(SLACK_WEBHOOK, {
            method: "post",
            body: JSON.stringify({
              icon_url: iconUrl,
              unfurl_links: 0,
              username: name,
              channel: channel || "",
              attachments: [
                {
                  title: CIRCLE_PULL_REQUEST,
                  title_link: CIRCLE_PULL_REQUEST || null,
                  text: `Storybook can be viewed here:\n${artifact.url}`,
                  ts: new Date().getTime() / 1000
                }
              ]
            })
          });
        } catch (e) {
          console.log("error:", e);
        }
      } else {
        console.log("slack webhook or slack channel is not set");
      }

      octokit.authenticate({
        type: "token",
        token: GITHUB_TOKEN
      });
      return octokit.issues.createComment({
        owner: CIRCLE_PROJECT_USERNAME,
        repo: CIRCLE_PROJECT_REPONAME,
        number: pullRequestId,
        body: `Storybook can be viewed here:\n${artifact.url}`
      });
    })
    .then(console.log)
    .catch(console.error);
};
