export async function getRealNameFromId({client,userId}) {
  const response = await client.users.info({ user: userId })
  return response?.user.real_name
}