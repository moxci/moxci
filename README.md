# :hammer_and_wrench: Klank [![CircleCI](https://circleci.com/gh/Naturalclar/klank.svg?style=shield)]

[![Greenkeeper badge](https://badges.greenkeeper.io/Naturalclar/klank.svg)](https://greenkeeper.io/)

**Klank** is a tool that will send notification to Pull Requests and Slack channel a Pull Request is made.
It will send the url of CircleCI artifact

This repository is inspired by [expo-qr-notify](https://github.com/watanabeyu/expo-qr-notify) by [@watanabeyu](https://github.com/watanabeyu)

It can be used to send a link of latest [storybook](https://storybook.js.org/) built in the Pull Request.

<img src="https://user-images.githubusercontent.com/6936373/54509684-b6f16300-498d-11e9-9457-44bc56bc669c.png" width="80%" />

# :package: Installation

```
yarn add -D klank
```

# :book: Example

In order to user Klank, you will need to set up a [CircleCI](https://circleci.com/sunset1-0/) project.

In your **Project Settings** -> **Environment Variables**, enter your Circle CI API Token as `CIRCLE_TOKEN`, and Github API Token as `GITHUB_TOKEN`

<img src="https://user-images.githubusercontent.com/6936373/54509831-3f700380-498e-11e9-9180-2b49343aa2ae.png" width="80%">

In your `config.yml` for CircleCI, add commands to specify the path that contains the artifact you'd like to notify.

<img width="265" src="https://user-images.githubusercontent.com/6936373/54510173-a641ec80-498f-11e9-9af6-dcb4f126b6b7.png">

In your `package.json`, specify the file you'd like to notify

<img width="293" alt="Screenshot 2019-03-18 15 10 34" src="https://user-images.githubusercontent.com/6936373/54510276-fde05800-498f-11e9-87d6-6de5f3dc8850.png">

When you send a Pull Request, the account tied to your `GITHUB_TOKEN` will send a link of the artifact.

<img src="https://user-images.githubusercontent.com/6936373/54509831-3f700380-498e-11e9-9180-2b49343aa2ae.png" width="80%">

## Slack Integration

Klank can also notify your CircleCI artifact to your slack channel!

Create an [incoming webhook](https://api.slack.com/incoming-webhooks) for your slack channel that you would like to notify.

Add the webhook URL as `SLACK_WEBHOOK` in your environment variables in CircleCI Project Settings.

<img width="454" alt="Screenshot 2019-03-18 14 55 21" src="https://user-images.githubusercontent.com/6936373/54509733-e43e1100-498d-11e9-9da1-89172b647aec.png">

# :green_heart: Special Thanks

Special Thanks to [@Leko](https://github.com/Leko) for the original PR notification script.
