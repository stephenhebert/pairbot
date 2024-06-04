import db from '../services/db'

export default async function ({
  ack,
  user_id,
  team_id,
  user_name,
  token,
  channel_id
}) {

  await db.user.upsert({
    where: {
      id: user_id,
      AND: {
        workspaceId: team_id
      }
    },
    update: { 
      channelId: channel_id,
    },
    create: {
      id: user_id,
      name: user_name,
      channelId: channel_id,
      workspace: {
        connectOrCreate: {
          where: { id: team_id },
          create: { id: team_id, token },
        },
      },
    },
  })

  await ack({
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `You have been enrolled for pairing in <#${channel_id}>!`
        }
      }
    ]
  })
}