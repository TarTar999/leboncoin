export class DiscutionModel {
  id: number
  lastMessageTimestamp: Date
  recipientId: number
  recipientNickname: string
  senderId: number
  senderNickname: string
  constructor({
    id,
    lastMessageTimestamp,
    recipientId,
    recipientNickname,
    senderId,
    senderNickname
  }) {
    this.id = id
    this.lastMessageTimestamp = lastMessageTimestamp
    this.recipientId = recipientId
    this.recipientNickname = recipientNickname
    this.senderId = senderId
    this.senderNickname = senderNickname
  }
}
