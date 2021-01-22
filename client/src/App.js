import {useEffect, useState} from 'react'
import {Aside, Dialog, Login, Rooms, Sender} from "./components";
import socket from './socket'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [messages, setMessages] = useState([])
    const [unreadMessagesLength, setUnreadMessagesLength] = useState(0)
    const [userName, setUserName] = useState('')
    const [allRooms, setAllRooms] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    // Login

    const onChangeUserName = (val) => {
        setUserName(val)
    }

    // Create Room

    const onCreateRoom = (userName, room) =>{
       if(userName && room){
           socket.emit('create__room', {userName, room})
       }
    }

    // Connect
    const connectTo = (room) => {
        if (userName && userName.trim().length) {
            if (room) {
                socket.emit('join', {userName, room})
            }
        } else {
            alert('Please, enter username')
        }
    }

    // Search rooms

    const searchRooms = (searchValue) => {
        setSearchValue(searchValue)
        socket.emit('search_rooms', searchValue)
    }

    // Send message

    const sendMessage = (message) => {
        if (message && message.trim().length) {
            socket.emit('send_message', {
                message,
                authorId: userData.id,
                author: userData.value,
                room: userData.room
            })
        }
    }

    // Read message

    const readMessage = (id, authorId) => {
        if (id && authorId) {
            socket.emit('read_message', {id, authorId, room: userData.room})
        }
    }

    // Leave room

    const onLeave = () => {
        setLoggedIn(false)
        setMessages(m => [])
        setUserName('')
        setActiveUsers([])
    }

    // Connect socket

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true)
        })
    }, [])

    // Catch CONNECTION REFUSED ERROR

    useEffect(() => {
        socket.on('connect_error', () => {
            setIsConnected(false)
        })
    }, [])

    // Send messagesLength

    useEffect(() => {
        const messagesLength = messages.filter(i => i.status === 'sent' && i.authorId !== userData.id).length
        if (userData && userData.room) {
            socket.emit('send_unread_length', {messagesLength, room: userData.room})
        }
    }, [messages, userData])

    // Set unreadMessagesLength

    useEffect(() => {
        if (userData && userData.room) {
            socket.on('get_unread_length', (length) => {
                setUnreadMessagesLength(l => length)
            })
        }
    }, [userData])

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

    useEffect(() => {
        if (userData && userData.room && messages && messages.length === 0) {
            socket.on('get_messages_history', (msgs) => {
                setMessages(m => [...msgs])
            })
        }
    }, [messages, userData])

    // Get read message

    useEffect(() => {
        socket.on('get_read_message', (msgId) => {
            setMessages((m) => {
                const indx = m.findIndex(i => i.id === msgId)
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
        })
    }, [])

    // Rooms

    useEffect(() => {
        socket.on('set_rooms', (rooms) => {
            setAllRooms(r => [...rooms])
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
                    <Rooms rooms={allRooms} connectTo={connectTo} searchRooms={searchRooms} searchValue={searchValue}
                           isConnected={isConnected} onCreateRoom={onCreateRoom}/>
                    <Login connectTo={connectTo} userName={userName} onChangeUserName={onChangeUserName}
                           isConnected={isConnected}/>
                </div>
            ) : (
                <div>
                    <Aside user={userData} users={activeUsers} onLeave={onLeave}
                           unreadMessagesLength={unreadMessagesLength} isConnected={isConnected}/>
                    <main className="main">
                        <Dialog messages={messages} userData={userData} readMessage={readMessage}
                                isConnected={isConnected}/>
                        <Sender sendMessage={sendMessage} isConnected={isConnected}/>
                    </main>
                </div>
            )}


        </div>
    );
}

export default App;
