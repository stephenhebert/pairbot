import db from '../services/db'
// import {
//   PrismaClient
// } from '@prisma/client'

// const db = new PrismaClient()

export default async function ({
  ack,
  user_id,
  team_id,
  channel_id
}) {

  await db.user.delete({
    where: {
      id: user_id,
      channelId: channel_id,
      workspaceId: team_id
    },
  })

  await ack({
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `You have been unenrolled from pairing in <#${channel_id}>!`
        }
      }
    ]
  })
}