import {Aside, Dialog, Login, Sender} from "./components";
import {useState, useEffect} from 'react'
import io from 'socket.io-client'

let socket;

const CONNECTION_PORT = 'localhost:8000/'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')

    const onChangeUserName = (name) => {
        setUserName(name)
    }


    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const onChangeMessage = (message) => {
        setMessage(message)
    }

    const sendMessage = async() => {

        let messageContent = {
            room: 'room',
            content: {
                author: userName,
                message
            }
        }

       await socket.emit("send_message", messageContent)
        setMessageList([...messageList, messageContent.content])
        setMessage("")
    }

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [])

    useEffect(()=>{
        socket.on('receive_message', (data)=>{
            setMessageList([...messageList, data])
        })
    })

    const connectToRoom = () => {
        setLoggedIn(true)
        socket.emit('join', 'room')
    }


    return (
        <div className='wrapper'>
            {!loggedIn ? (
                <Login onChangeUserName={onChangeUserName} connectToRoom={connectToRoom}/>
            ) : (
                <div>
                    <Aside/>
                    <main className="main">
                        <Dialog messages={messageList} userName={userName}/>
                        <Sender onChangeMessage={onChangeMessage} sendMessage={sendMessage}/>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;
