import { config } from 'dotenv'
import commands from './commands'
import { getRealNameFromId } from './utils/getRealNameFromUserId';

config()

const { SLACK_APP_TOKEN, SLACK_DEV_BOT_TOKEN } = process.env

import { App } from "@slack/bolt";

const app = new App({
  appToken: SLACK_APP_TOKEN,
  token: SLACK_DEV_BOT_TOKEN,
  socketMode: true,
});

app.command("/pairbot", async ({ ack, client, context, body }) => {

  const { 
    team_id,
    team_name, 
    channel_id, 
    channel_name, 
    user_id, 
    user_name,
    text 
  } = body
  const { botToken: token } = context
  // const real_name = await getRealNameFromId({ client, userId: user_id })

  const [command, ...args] = text.split(" ");

  try {


    if (!command || command === "help") {
      await commands.help({ ack })
      return
    }

    const commandFn = commands[command]


    if (commandFn) {
      await commandFn({ 
        client, 
        ack, 
        context, 
        team_id, 
        team_name, 
        channel_id, 
        channel_name, 
        user_id, 
        user_name, 
        // real_name, 
        text, 
        token
      })
    } else {
      await ack({
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Sorry, <@${user_id}>, I don't know how to do that.`
            }
          },
        ],
        response_type: "ephemeral",
      });
    }
    
  }
  catch (e) {
    console.error(e)
    await ack({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Sorry, <@${user_id}>, something went wrong.`
          }
        },
      ],
      response_type: "ephemeral",
    });
  }

});



app.start().catch((error) => {
  console.error(error);
  process.exit(1);
});