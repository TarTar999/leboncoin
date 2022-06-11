export class MessageModel {
  authorId: number
  body: string
  conversationId: number
  id: number
  timestamp: Date
  constructor({ authorId, body, conversationId, id, timestamp }) {
    this.authorId = authorId
    this.body = body
    this.conversationId = conversationId
    this.id = id
    this.timestamp = timestamp
  }
}
