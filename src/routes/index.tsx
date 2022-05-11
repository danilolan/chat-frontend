import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Chat from '../pages/chat'
import Home from '../pages/home'

import { Socket } from 'socket.io-client'

type PropTypes = {
  socket: Socket
}

export function AppRoutes ({ socket } : PropTypes) {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat socket={socket}/>}/>
      </Routes>
    </Router>
  )
}
