import { AppRoutes } from '../routes'
import { io, Socket } from 'socket.io-client'

const conectionUrl : string = import.meta.env.VITE_SERVER_ADRESS
const socket : Socket = io(conectionUrl, {
  transports: ['websocket', 'polling', 'flashsocket']
})

function App () {
  return (
    <AppRoutes socket={socket}/>
  )
}

export default App
