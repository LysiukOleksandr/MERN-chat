import {useState, useEffect} from 'react'
import {Aside, Dialog, Login, Sender} from "./components";
import io from 'socket.io-client'

let socket;

const CONNECTION_PORT = 'localhost:8000/'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    const [userData, setUserData] = useState(null)
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
        if (message.trim().length) {
            let messageContent = {
                room: 'room',
                content: {
                    author: userName,
                    authorId: userData.id,
                    messageId: Math.floor(Math.random() * 100000000),
                    status: 'sent',
                    message
                }
            }

            await socket.emit("send_message", messageContent)
            setMessageList([...messageList, messageContent.content])
            setMessage('')
        }
    }

    const connectToRoom = () => {
        setLoggedIn(true)
        socket.emit('join', {room: 'room', user: userName})
    }

    const readMessage = async (messageId) => {
        const messageIndex = messageList.findIndex((i) => i.messageId === messageId)
        if (messageIndex) {

            //  const msg = Object.assign({}, messageList[messageIndex])
            // msg.status = 'read'
            // const newArr = messageList.filter((item, index) => index !== messageIndex)
            // setMessageList([...newArr, msg])
            // console.log(messageList)
            // await socket.emit("read_message", msg)

            let msgs = [...messageList]
            const msg = Object.assign({}, messageList[messageIndex])
            msg.status = 'read'
            msgs.splice(messageIndex, 1, msg)
            setMessageList(msgs)
            await socket.emit('read_message', msg)

        }
    }

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [])


    useEffect(() => {
        socket.on('receive_message', (data) => {
            // const msg = messageList.length && messageList.find((i) => i.messageId === data.messageId)
            // if (!msg) {
            //     console.log('DATA:', data)
            // console.log('PREV:', [...messageList])
            setMessageList([...messageList, data])
            // console.log([...messageList, data])
            // }
        })
    }, [messageList])


    useEffect(() => {
        socket.on('set_users', (data) => {
            setActiveUsers(data)
        })
    }, [])

    useEffect(() => {
        socket.on('set_user', (data) => {
            setUserData(data)
        })
    }, [])

    useEffect(() => {
        socket.on('receive_read_message', (data) => {
            const messageIndex = messageList.findIndex((i) => i.messageId === data.messageId)
            // const newArr = messageList.filter((item, index) => index !== messageIndex)
            //
            // setMessageList([...newArr, data])

            let msgs = [...messageList]
            msgs.splice(messageIndex, 1, data)
            setMessageList(msgs)


        })
    }, [messageList])

    return (
        <div className='wrapper'>
            {!loggedIn ? (
                <Login onChangeUserName={onChangeUserName} connectToRoom={connectToRoom}/>
            ) : (
                <div>
                    <Aside userName={userName} activeUsers={activeUsers}/>
                    <main className="main">
                        <Dialog messages={messageList} userData={userData} readMessage={readMessage}/>
                        <Sender onChangeMessage={onChangeMessage} sendMessage={sendMessage} message={message}/>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;
