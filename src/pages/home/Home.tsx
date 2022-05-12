/* eslint-disable operator-linebreak */
import styles from './styles.module.scss'
import { useState, useEffect } from 'react'

import { Socket } from 'socket.io-client'
import Chat from '../chat'

interface PropTypes {
  socket: Socket
}

function Home ({ socket } : PropTypes) {
  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('abcd')
  const [messages, setMessages] = useState([])
  const [inChat, setInChat] = useState(false)

  const onSubmit = () => {
    if (name) {
      socket.emit('join room', roomName, (msg : any) => {
        setMessages(msg)
        setInChat(true)
      })
    }
  }

  useEffect(() => {
    if (window.location.hash) {
      setRoomName(window.location.hash.replace('#', ''))
    } else {
      setRoomName('abcd')
      window.location.hash = 'abcd'
    }
  }, [])

  return (
    !inChat
      ? <section className={styles.home}>
      <div className={styles.ui}>
        <h2>Type your name:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => onSubmit()}
        >
          Enter in room
        </button>
      </div>
    </section>
      :
    <Chat
      socket={socket}
      name={name}
      messages={messages}
      roomName={roomName}
    />
  )
}

export default Home
