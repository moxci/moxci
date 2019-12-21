const Octokit = require("@octokit/rest");

type Props = {
  owner: string;
  repo: string;
  number: string | number;
  token: string;
  artifactUrl: string;
  body: string;
};

export const notifyGithubPr = async ({
  owner,
  repo,
  number,
  token,
  artifactUrl,
  body
}: Props) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.issues.createComment({
    owner,
    repo,
    number,
    body: `${body}:\n${artifactUrl}`
  });
};
