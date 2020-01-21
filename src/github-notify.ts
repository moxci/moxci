import Octokit from "@octokit/rest";

type Props = {
  owner: string;
  repo: string;
  issue_number: number;
  token: string;
  artifactUrl: string;
  body: string;
};

export const notifyGithubPr = async ({
  owner,
  repo,
  issue_number,
  token,
  artifactUrl,
  body
}: Props) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.issues.createComment({
    owner,
    repo,
    issue_number,
    body: `${body}:\n${artifactUrl}`
  });
};
