export default async function({ ack, client, user_id, context }) {
  await ack({})

  // const users = await client.users.list()
  const user = await client.users.info({ user: user_id })
}