import { FC, useCallback } from 'react'
import Discution from '../components/Discution'
import { useEffect, useState } from 'react'
import { DiscutionModel } from '../models/Discution'
import { useAuth } from '../context/AuthContext'
import { UserModel } from '../models/User'
import Router from 'next/router'
import Link from 'next/link'
import { getLoggedUserId, useDetailsUser } from '../utils/getLoggedUserId'
import toast from '../components/Toast'

export const loggedUserId = getLoggedUserId()

const Home: FC = () => {
  const [newDiscUSerr, setNewDiscUSerr] = useState('')
  const [listDiscutions, setListDiscutions] = useState<DiscutionModel[]>([])
  const [listUser, setListuser] = useState<UserModel[]>([])
  const [querry, setQuerry] = useState('')

  const { user, login } = useAuth()
  const [userLogin] = useDetailsUser(loggedUserId)
  const notify = useCallback((type, message) => {
    toast({ type, message })
  }, [])
  useEffect(() => login(userLogin), [login, userLogin])
  useEffect(
    function () {
      const fetchData = async function () {
        const response = await fetch(
          `http://localhost:3005/conversations/${user ? user.id : 0}`,
        )
        const responseData = await response.json()
        if (response.ok) {
          let data = responseData.map((item) => new DiscutionModel(item))
          setListDiscutions(data)
        } else {
          notify('error', 'erreur veuillez reessayer 😔')
        }
      }
      fetchData().catch(console.error)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  )
  useEffect(() => {
    const fetchData = async function () {
      const response = await fetch(`http://localhost:3005/users`)
      const responseData = await response.json()
      if (response.ok) {
        let data = responseData.map((item) => new UserModel(item))
        setListuser(data)
      } else {
        notify('error', 'erreur veuillez reessayer 😔')
      }
    }
    fetchData().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const creatDiscution = async (reciver: UserModel) => {
    const response = await fetch(
      `http://localhost:3005/conversations/${user.id}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientId: reciver.id }),
      },
    )
    if (response.ok) {
      const responseData = await response.json()
      let discution = new DiscutionModel({
        id: responseData.id,
        lastMessageTimestamp: '',
        recipientId: responseData.recipientId,
        recipientNickname: reciver.nickname,
        senderId: user.id,
        senderNickname: user.nickname,
      })
      setListDiscutions((l) => [...l, discution])
      Router.push({
        pathname: '/conversation',
        query: { discution: discution.id },
      })
    } else {
      notify('error', 'erreur veuillez reessayer 😔')
    }

    return true
  }

  const handelStartDisc = () => {
    let index = listUser.findIndex((i) => i.id === parseInt(newDiscUSerr))
    creatDiscution(listUser[index])
  }

  return (
    <div className="container d-flex justify-content-center pt-5 flex-column align-items-center">
      <nav className="col-lg-10 col-12  navbar navbar-expand-lg navbar-light bg-light">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={querry}
                onChange={(e) => setQuerry(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="row col-lg-10 col-12 board">
        {listDiscutions
          .filter(
            (i) =>
              i.recipientNickname
                .toUpperCase()
                .indexOf(querry.toUpperCase()) !== -1,
          )
          .map((discution) => (
            <Discution discution={discution} key={discution.id} tabIndex={0} />
          ))}
      </div>
      <button
        className="btn btn-primary newDiscu"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        tabIndex={1}
      >
        +
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Nouvelle Discussion
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-control"
                value={newDiscUSerr}
                onChange={(e) => setNewDiscUSerr(e.target.value)}
              >
                <option value="">Selectioner un correspondant</option>
                {listUser.map((userSelect) => (
                  <option value={userSelect.id} key={userSelect.id}>
                    {userSelect.nickname}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handelStartDisc}
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
              >
                Discuter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
