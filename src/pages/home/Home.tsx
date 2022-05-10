import { useState } from 'react'
import styles from './styles.module.scss'

import { useNavigate } from 'react-router-dom'

function Home () {
  const [name, setName] = useState<string>('')
  const [room, setroom] = useState<number>(0)

  const navigate = useNavigate()

  const login = () => {
    localStorage.setItem('name', name)
    navigate('/chat')
  }
  return (
    <section className={styles.home}>
      <div className={styles.ui}>
        <h2>Type your name:</h2>
        <div>
          <button onClick={() => setroom(1)} className={`${styles.room_btn} ${room === 1 && styles.active}`}>
            Room 1
          </button>
          <button onClick={() => setroom(2)} className={`${styles.room_btn} ${room === 2 && styles.active}`}>
            Room 2
          </button>
        </div>
        <input
          type="text"
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          disabled={ !room || !name }
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </section>
  )
}

export default Home
