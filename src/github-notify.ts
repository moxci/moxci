const Octokit = require("@octokit/rest");

export const notifyGithubPr = async (
  owner: string,
  repo: string,
  number: string | number,
  token: string,
  artifactUrl: string,
  body: string = "Artifact can be viewed here"
) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.issues.createComment({
    owner,
    repo,
    number,
    body: `${body}:\n${artifactUrl}`
  });
};
