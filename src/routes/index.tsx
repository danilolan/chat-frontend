import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Chat from '../pages/chat'
import Home from '../pages/home'

export function AppRoutes () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/' element={<Chat/>}/>
      </Routes>
    </Router>
  )
}
