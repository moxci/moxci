import Axios, { AxiosResponse } from "axios";

interface Artifact {
  path: string;
  pretty_path: string;
  node_index: number;
  url: string;
}

export const getArtifactUrl = async (
  url: string,
  targetPath: string
): Promise<string> => {
  return await Axios.get(url)
    .then(({ data }: AxiosResponse<Artifact[]>) => data)
    .then(
      (artifacts: Artifact[]) =>
        artifacts.filter((artifact: Artifact) =>
          artifact.path.includes(targetPath)
        )[0]
    )
    .then(
      (artifact: Artifact): string => {
        if (!artifact) {
          throw new Error(`Cannot find any artifacts with: ${targetPath}`);
        }
        return artifact.url;
      }
    )
    .catch(error => {
      console.log(error);
      return "";
    });
};
