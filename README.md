# Blackjack Trainer Alexa Skill

This is an Alexa skill for teaching Basic Strategy to the card game Blackjack. Alexa will deal a sample hand and quiz the user on the correct move based on Basic Strategy odds.

## Setup

Blackjack Trainer uses a serverless architecture via an AWS Lambda function. To deploy on your own Lambda for testing, follow these steps:

1. Clone and download this repository.
2. Install dependencies using `yarn`.
3. Run `npm run setup` to generate the Lambda deployment files.
4. Fill out the necessary fields in `.env`.
5. Add your Alexa Skill app id to `deploy.env` as `APP_ID=<appId>`.
6. Run `npm run deploy` to deploy skill to your Lambda function.
7. Add the contents of `intent-schema.json` and `sample-utterances.txt` to your Alexa skill.
8. Install and test.

## Testing

You can test locally by editing `event.json` with a specific Lambda Request. You may find it useful to copy and paste from the Testing page of the Alexa skill.

## Acknowledgements

Blackjack Trainer makes use of the following projects:

* [engine-blackjack](https://github.com/kedoska/engine-blackjack)
* [blackjack-strategy](https://github.com/gsdriver/blackjack-strategy)
* [node-lambda-babel-template](https://github.com/flesch/node-lambda-babel-template)
* [Alexa Skills Kit SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs)

Thanks to the many developers who contributed to these and other open source projects!
