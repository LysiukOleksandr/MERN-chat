import {useEffect, useState} from 'react'
import {Aside, Dialog, Login, Sender} from "./components";
import socket from './socket'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [messages, setMessages] = useState([])

    // Connect
    const connectTo = (userName) => {
        if (userName && userName.trim().length) {
            socket.emit('join', userName)
        }
    }

    // Send message

    const sendMessage = (message) => {
        if (message && message.trim().length) {
            socket.emit('send_message', {
                message,
                messageId: `${userData.id}_${Math.floor(Math.random() * 100000000) + Math.random() * 5324}_${userData.value}`,
                authorId: userData.id,
                author: userData.value
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
            // setMessages(m => [...m, message])
            setMessages(m => {
                if (m) {
                    return [...m, message]
                }
            })

        })
    }, [])

    // Get read message

    // useEffect(()=>{
    //     socket.on('get_read_message', (mgsId)=>{
    //         console.log('HERE HERE HERE')
    //     })
    // },[])

    useEffect(() => {
        socket.on('get_read_message', (msgId) => {
            setMessages((m) => {
                if (m) {
                    const indx = m.findIndex(i => i.messageId === msgId)
                    if (indx) {
                        let msgs = [...m]
                        console.log(msgs)
                        msgs[indx].status = 'read'
                        console.log(msgs)
                        return [...msgs]
                    }
                } else {
                    console.log('попадает сюда')

                }
            })
        })
    }, [])

    //
    // useEffect(() => {
    //     socket.on('get_read_message', (message) => {
    //
    //         setMessages((m) => {
    //             if (m) {
    //                 const msgIndex = m.find(i => i.messageId === message.messageId)
    //                 if (msgIndex) {
    //                     let msgs = [...m];
    //                     msgs.splice(msgIndex, 1, message)
    //                     return msgs
    //                 }
    //             }
    //         })
    //     })
    // }, [])

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

    // isLogged
    useEffect(() => {
        if (userData) {
            setLoggedIn(true)
        }
    }, [userData])

    return (
        <div className='wrapper'>
            {!loggedIn ? (
                <Login connectTo={connectTo}/>
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
