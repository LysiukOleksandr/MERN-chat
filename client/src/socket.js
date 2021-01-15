import io from "socket.io-client";


const CONNECTION_PORT = 'localhost:8000/'

let socket = io(CONNECTION_PORT)

export default socket