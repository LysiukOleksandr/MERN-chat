import {Aside, Dialog, Login, Sender} from "./components";
import {useState, useEffect} from 'react'
import io from 'socket.io-client'

let socket;

const CONNECTION_PORT = 'localhost:8000/'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

    const onChangeUserName = (name) => {
        setUserName(name)
    }

    const onChangeMessage = (message) => {
        setMessage(message)
    }

    const sendMessage = async () => {

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


    const connectToRoom = () => {
        setLoggedIn(true)
        socket.emit('join', {room: 'room', user: userName})
    }

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList([...messageList, data])
        })
    })

    useEffect(()=>{
       socket.on('set_users',(data)=>{
           setActiveUsers(data)
       })
    },[])



    return (
        <div className='wrapper'>
            {!loggedIn ? (
                <Login onChangeUserName={onChangeUserName} connectToRoom={connectToRoom}/>
            ) : (
                <div>
                    <Aside userName={userName} activeUsers={activeUsers}/>
                    <main className="main">
                        <Dialog messages={messageList} userName={userName}/>
                        <Sender onChangeMessage={onChangeMessage} sendMessage={sendMessage} message={message}/>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;
