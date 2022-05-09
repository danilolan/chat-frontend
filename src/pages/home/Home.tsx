import { useState } from 'react'
import styles from './styles.module.scss'

import { useNavigate } from 'react-router-dom'

function Home () {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const login = () => {
    localStorage.setItem('name', name)
    navigate('/chat')
  }

  return (
    <section className={styles.home}>
      <div className={styles.ui}>
        <h2>Type your name:</h2>
        <input
          type="text"
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => login()}>Login</button>
      </div>
    </section>
  )
}

export default Home
