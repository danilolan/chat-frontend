import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Socket } from 'socket.io-client'

type NameType = string | null
type RoomNameType = string | null
type MsgType = {
  roomName: string
  author: string,
  content: string
}
type MsgDataType = MsgType[]
type PropTypes = {
  socket: Socket
  messages: MsgDataType,
  roomName: RoomNameType,
  name: NameType
}

function Chat ({ socket, messages, roomName, name } : PropTypes) {
  const [msgData, setMsgData] = useState<MsgDataType>(messages)
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    socket.on('new message', (messages) => {
      setMsgData(messages)
    })
  }, [])

  useEffect(() => {
    document.getElementById('display')!.scrollTo(0, document.getElementById('display')!.scrollHeight)
  }, [msgData])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (input) {
      socket.emit('send message', { roomName, author: name, content: input })
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
            {msg.content}
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
