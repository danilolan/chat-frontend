import { useState, useEffect } from 'react'
import styles from './styles.module.scss'

import { io, Socket } from 'socket.io-client'

type nameType = string | null

type MsgType = {
  author: string,
  data: string
}
type MsgDataType = MsgType[]

const conectionUrl = import.meta.env.VITE_SERVER_ADRESS
console.log(conectionUrl)
let socket : Socket

function Chat () {
  const [msgData, setMsgData] = useState<MsgDataType>()
  const [input, setInput] = useState<string>('')
  const [name, setName] = useState<nameType>('')

  useEffect(() => {
    setName(localStorage.getItem('name'))

    socket = io(conectionUrl, {
      transports: ['websocket', 'polling', 'flashsocket']
    })

    socket.on('receivedMessage', (msg) => {
      setMsgData(msg)
    })

    return () => closeComponent()
  }, [])

  useEffect(() => {
    document.getElementById('display')!.scrollTo(0, document.getElementById('display')!.scrollHeight)
  }, [msgData])

  function closeComponent () {
    socket.disconnect()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input) {
      socket.emit('sendMessage', { author: name, data: input })
      setInput('')
    }
  }

  const renderMsgs = () => {
    return msgData?.map((msg, index) => {
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
        <div className={styles.display} id='display'>
          {renderMsgs()}
        </div>
        <div className={styles.input_row}>
          <form className={styles.input_row} onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              name='name'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Chat
