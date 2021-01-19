import {useEffect, useState} from 'react'
import {Aside, Dialog, Login, Rooms, Sender} from "./components";
import socket from './socket'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [messages, setMessages] = useState([])
    const [userName, setUserName] = useState('')
    const [room, setRoom] = useState('')

    // Login

    const onChangeUserName = (val) => {
        setUserName(val)
    }

    const onChangeRoom = (val) => {
        setRoom(val)
    }

    // Connect
    const connectTo = () => {
        if (userName && userName.trim().length && room) {
            socket.emit('join', {userName, room})
        }
    }

    // Send message

    const sendMessage = (message) => {
        if (message && message.trim().length) {
            socket.emit('send_message', {
                message,
                messageId: `${userData.id}_${Math.floor(Math.random() * 100000000) + Math.random() * 5324}_${userData.value}`,
                authorId: userData.id,
                author: userData.value,
                room
            })
        }
    }

    // Read message

    const readMessage = (messageId) => {
        if (messageId) {
            socket.emit('read_message', messageId)
        }
    }

    // Get message

    useEffect(() => {
        socket.on('get_message', (message) => {
            setMessages(m => {
                if (m) {
                    return [...m, message]
                }
            })

        })
    }, [])

    // Get read message

    useEffect(() => {
        socket.on('get_read_message', (msgId) => {
            setMessages((m) => {
                const indx = m.findIndex(i => i.messageId === msgId)
                if (indx !== -1) {
                    let msgs = [...m]
                    msgs[indx].status = 'read'
                    return [...msgs]
                } else {
                    return [...m]
                }
            })
        })
    }, [])

    // Current user
    useEffect(() => {
        socket.on('set_user', (user) => {
            setUserData(user)
        })
    }, [])


    // Active users
    useEffect(() => {
        socket.on('set_users', (users) => {
            setActiveUsers(users)
            console.log(users)
        })
    }, [])

    // isLogged
    useEffect(() => {
        if (userData) {
            setLoggedIn(true)
        }
    }, [userData])



    return (
        <div className='wrapper'>
            {!loggedIn ? (
                <div>
                    <Rooms/>
                    <Login connectTo={connectTo} userName={userName} room={room} onChangeUserName={onChangeUserName}
                           onChangeRoom={onChangeRoom}/>
                </div>
            ) : (
                <div>
                    <Aside user={userData} users={activeUsers}/>
                    <main className="main">
                        <Dialog messages={messages} userData={userData} readMessage={readMessage}/>
                        <Sender sendMessage={sendMessage}/>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;
