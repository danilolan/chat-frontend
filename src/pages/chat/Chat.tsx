import React, { useState, useEffect, useMemo } from 'react'

import styles from './styles.module.scss'
import { io } from 'socket.io-client'
const ENDPOINT = 'http://localhost:3001'

const msgData = [
  {author: 'danilo', data: 'Ola manos tudo bem?'},
  {author: 'alberto', data: 'Eae cara'},
  {author: 'alberto', data: 'Tranquilo?'},
  {author: 'matheus', data: 'eu to de boas rapaziada e vocês como estão? tudo no sigilo, no esquema'},
  {author: 'danilo', data: 'Tudo show guys'},
  {author: 'alberto', data: 'Eae cara'},
]

function Chat () {
  const [input, setInput] = useState('')
  const [name, setName] = useState('')

  const socket  = useMemo(() => io(ENDPOINT), [])

  useEffect( () => {
    setName( localStorage.getItem('name') )
  },[])

  const onClick = () => {
    console.log('click')
  }

  const renderMsgs = () => {
    return msgData.map( (msg) => {
      const owner = msg.author === name ? 'mine' : 'other'

      return(
        <div className={styles.msg_container + ' ' + styles[owner]}>
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
   );
}

export default Chat;