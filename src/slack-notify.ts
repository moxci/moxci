import axios from "axios";

export const notifySlack = (slackUrl: string, artifactUrl: string): void => {
  try {
    axios.post(slackUrl, {
      attachments: [
        {
          title: "Your Artifact is Here!",
          text: `New artifact arrived from *CircleCI.* \n Your Artifact can be viewed here:\n${artifactUrl}`
        }
      ]
    });
  } catch (error) {
    console.log("error:", error);
  }
};
