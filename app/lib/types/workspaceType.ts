export type WorkspaceType = {
  id: number,
  name: string,
  creater_user_name?: string,
  creater_id: number,
  url: string,
  invite_code?: string
}

export type MembersType = {
  user_id: number,
  username: string,
  user_member: string,
  email: string
}