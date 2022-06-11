import { FC, useCallback, useRef } from 'react'
import { useEffect, useState, memo } from 'react'
import { MessageModel } from '../models/Message'
import Message from '../components/Message'
import { useAuth } from '../context/AuthContext'
import Router from 'next/router'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDetailsUser } from '../utils/getLoggedUserId'
import toast from '../components/Toast'

function Messagewithprops({ owner, message }) {
  return <Message owner={owner} message={message} />
}
export const MemoMessage = memo(Messagewithprops)

const Conversation: FC = () => {
  const router = useRouter()
  const notify = useCallback((type, message) => {
    toast({ type, message })
  }, [])
  const discutionID = router.query.discution
    ? parseInt(router.query.discution.toString())
    : 0
  const reciverID = router.query.reciver
    ? parseInt(router.query.reciver.toString())
    : 0
  const [messagesData, setMessagesData] = useState([])
  const [msg, setMsg] = useState('')

  const { user } = useAuth()
  const screen = useRef()

  useEffect(() => {
    if (!user) Router.push('./')
    const fetchData = async function () {
      const response = await fetch(
        `http://localhost:3005/messages?conversationId=${discutionID}`,
      )
      const responseData = await response.json()
      if (response.ok) {
        let data = responseData.map((item) => new MessageModel(item))
        setMessagesData(data)
      } else {
        notify('error', 'erreur veuillez reessayer 😔')
      }
    }
    fetchData().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discutionID, user])

  useEffect(() => {
    document
      .getElementById('screen')
      .scrollTo(0, document.getElementById('screen').scrollHeight)
  }, [messagesData])

  const [reciver] = useDetailsUser(reciverID)

  const sendMsg = async (message) => {
    try {
      fetch(`http://localhost:3005/messages/${discutionID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: message, timestamp: Date.now() }),
      })
      let messageObj = new MessageModel({
        authorId: user.id,
        body: message,
        conversationId: discutionID,
        id: messagesData.length + 1,
        timestamp: Date.now(),
      })
      setMsg('')
      setMessagesData((m) => [...m, messageObj])
      return true
    } catch (error) {
      notify('error', 'erreur veuillez reessayer 😔')
      return false
    }
  }
  const handleSubmitmsg = () => {
    if (msg.length > 0) {
      sendMsg(msg)
    }
  }

  return (
    <div className="container d-flex justify-content-center pt-5 flex-column align-items-center">
      <nav className="col-lg-10 col-12 navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href={{ pathname: '/' }}>
            <a className="navbar-brand">Leboncoin</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page">
                  {reciver ? reciver.nickname : ''}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className=" d-flex flex-column row col-lg-10 col-12 "
        style={{ height: '90vh' }}
      >
        <div id="screen" className="screen col-12" ref={screen}>
          {messagesData.map((message) => (
            <MemoMessage
              owner={user ? user.id : 0}
              message={message}
              key={message.id}
            />
          ))}
        </div>
        <div className="writhBloc col-12">
          <div className="chat-app-form">
            <div className="col-12 row d-flex justify-content-between">
              <textarea
                className="form-control fieldMessage"
                placeholder="entrer le pseudo de votre correspondant"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                className="btn btn-primary sendMessagebtn"
                onClick={handleSubmitmsg}
              >
                envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation
