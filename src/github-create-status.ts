import { Octokit } from "@octokit/rest";

type Props = {
  owner: string;
  repo: string;
  token: string;
  artifactUrl: string;
  body: string;
  sha: string;
  context: string;
};

export const notifyGithubCiStatus = async ({
  owner,
  repo,
  token,
  body,
  artifactUrl,
  sha,
  context
}: Props) => {
  const octokit = new Octokit({ auth: `token ${token}` });
  return octokit.repos.createStatus({
    owner,
    repo,
    sha,
    state: "success",
    target_url: artifactUrl,
    description: body,
    context
  });
};
