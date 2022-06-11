export class UserModel {
  id: number
  nickname: string
  token: string
  constructor({ id, nickname, token }) {
    this.id = id
    this.nickname = nickname
    this.token = token
  }
}
