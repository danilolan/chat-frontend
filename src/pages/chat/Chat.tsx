import { useState, useEffect } from 'react'
import styles from './styles.module.scss'

import { io, Socket } from 'socket.io-client'

const msgData = [
  { author: 'danilo', data: 'Ola manos tudo bem?' },
  { author: 'alberto', data: 'Eae cara' },
  { author: 'alberto', data: 'Tranquilo?' },
  { author: 'matheus', data: 'eu to de boas rapaziada e vocês como estão? tudo no sigilo, no esquema' },
  { author: 'danilo', data: 'Tudo show guys' },
  { author: 'alberto', data: 'Eae cara' }
]

type nameType = string | null

const conectionUrl = 'http://localhost:3001'
let socket : Socket

function Chat () {
  const [input, setInput] = useState('')
  const [name, setName] = useState<nameType>('')

  useEffect(() => {
    setName(localStorage.getItem('name'))

    socket = io(conectionUrl, {
      transports: ['websocket', 'polling', 'flashsocket']
    })

    socket.on('chat', (msg) => {
      console.log(msg)
    })

    return () => closeComponent()
  }, [])

  function closeComponent () {
    socket.disconnect()
  }

  const onClick = () => {
    console.log('click')
  }

  const renderMsgs = () => {
    return msgData.map((msg, index) => {
      const owner = msg.author === name ? 'mine' : 'other'

      return (
        <div className={styles.msg_container + ' ' + styles[owner]} key={index}>
          <label>
            {msg.author}
          </label>
          <div className={styles.data}>
            {msg.data}
          </div>
        </div>
      )
    })
  }

  return (
    <section className={styles.chat}>
      <div className={styles.chat_container}>
        <div className={styles.display}>
          {renderMsgs()}
        </div>
        <div className={styles.input_row}>
          <input
            type='text'
            name='name'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={ () => onClick() }>Send</button>
        </div>
      </div>
    </section>
  )
}

export default Chat
