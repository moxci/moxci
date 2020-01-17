import Octokit from "@octokit/rest";

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
  const issue_number = Number(number)
  if (Number.isNaN(issue_number)) {
    console.error("Invalid Pull Request Id");
    return;
  }
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.issues.createComment({
    owner,
    repo,
    issue_number,
    body: `${body}:\n${artifactUrl}`
  });
};
