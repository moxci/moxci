import axios from "axios";

export const notifySlack = (
    slackUrl: string,
    artifactUrl: string,
    message: string = "New artifact arrived from *CircleCI.* \n Your Artifact can be viewed here:"
): void => {
  try {
    axios.post(slackUrl, {
      attachments: [
        {
          title: "Your Artifact is Here!",
          text: `${message}\n${artifactUrl}`
        }
      ]
    });
  } catch (error) {
    console.log("error:", error);
  }
};
