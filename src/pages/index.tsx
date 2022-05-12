import Home from '../pages/home'
import { io, Socket } from 'socket.io-client'

const conectionUrl : string = import.meta.env.VITE_SERVER_ADRESS
const socket : Socket = io(conectionUrl, {
  transports: ['websocket', 'polling', 'flashsocket']
})

function App () {
  return (
    <Home socket={socket}/>
  )
}

export default App
