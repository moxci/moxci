<h1 align="center"><img src="https://github.com/moxci.png" width="36px"/> Moxci</h1>

![CircleCI](https://circleci.com/gh/moxci/moxci.svg?style=shield)
[![npm version](https://badge.fury.io/js/moxci.svg)](https://badge.fury.io/js/moxci)

**Moxci** is a tool that will send notification to Pull Requests and Slack channel when a Pull Request is made.
It will send the url of the CircleCI artifact.

This repository is inspired by [expo-qr-notify](https://github.com/watanabeyu/expo-qr-notify) by [@watanabeyu](https://github.com/watanabeyu)

It can be used to send a link of latest [storybook](https://storybook.js.org/) built in the Pull Request.

<img src="https://user-images.githubusercontent.com/6936373/54509684-b6f16300-498d-11e9-9457-44bc56bc669c.png" width="80%" />

# :package: Installation

```
yarn add -D moxci
```

# :book: Example

In order to user moxci, you will need to set up a [CircleCI](https://circleci.com/sunset1-0/) project.

In your **Project Settings** -> **Environment Variables**, enter your Circle CI API Token as `CIRCLE_TOKEN`, and Github API Token as `GITHUB_TOKEN`

<img src="https://user-images.githubusercontent.com/6936373/54509831-3f700380-498e-11e9-9180-2b49343aa2ae.png" width="80%">

In your `config.yml` for CircleCI, add commands to specify the path that contains the artifact you'd like to notify.

```yml
- store_artifacts:
    path: artifact
- run:
    name: "Notify Artifact in Pull Request"
    command: npx moxci path/to/artifact
```

When you send a Pull Request, the account tied to your `GITHUB_TOKEN` will send a link of the artifact.

<img src="https://user-images.githubusercontent.com/6936373/54509831-3f700380-498e-11e9-9180-2b49343aa2ae.png" width="80%">

## Slack Integration

moxci can also notify your CircleCI artifact to your slack channel!

Create an [incoming webhook](https://api.slack.com/incoming-webhooks) for your slack channel that you would like to notify.

Add the webhook URL as `SLACK_WEBHOOK` in your environment variables in CircleCI Project Settings.

<img width="454" alt="Screenshot 2019-03-18 14 55 21" src="https://user-images.githubusercontent.com/6936373/54509733-e43e1100-498d-11e9-9da1-89172b647aec.png">

# :green_heart: Special Thanks

Special Thanks to [@Leko](https://github.com/Leko) for the original PR notification script.
