import db from '../services/db'

export default async function ({
  ack,
  team_id,
  channel_id
}) {

  const users = await db.user.findMany({
    where: {
      workspaceId: team_id,
      channelId: channel_id
    }
  })

  await ack({
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `There ${users.length === 1 ? `is ${users.length} user` : `are ${users.length} users`} currently enrolled for pairing in <#${channel_id}>!`
        }
      }
    ]
  })

}