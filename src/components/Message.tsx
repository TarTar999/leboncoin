import type { FC } from 'react'
import { MessageModel } from '../models/Message'

const Message: FC<{ message: MessageModel; owner: number }> = ({
  message,
  owner,
}) => {
  const msgBoxClass =
    owner === message.authorId
      ? 'buble senderMsgBlock'
      : 'buble reciverMsgBlock'
  const msgClass = owner === message.authorId ? 'senderMsg' : 'reciverMsg'
  return (
    <div className={msgBoxClass}>
      <div className={msgClass}>{message.body}</div>
    </div>
  )
}

export default Message
