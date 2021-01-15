import {useState, useEffect} from 'react'
import {Aside, Dialog, Login, Sender} from "./components";
import io from 'socket.io-client'

let socket;

const CONNECTION_PORT = 'localhost:8000/'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [activeUsers, setActiveUsers] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [])

    // CONNECT
    const connectTo = (userName) => {
        if (userName && userName.trim().length) {
            socket.emit('join', userName)
        }
    }

    // SEND MESSAGE

    const sendMessage = (message) => {
        if (message && message.trim().length) {
            socket.emit('send_message', {
                message,
                messageId: `${userData.id}_${Math.floor(Math.random() * 1000000)}`,
                authorId: userData.id,
                author: userData.value
            })
        }
    }


    // GET MESSAGE

    useEffect(() => {
        socket.on('get_message', (message) => {
            setMessages([...messages, message])
        })
    }, [])

    useEffect(()=>{
        console.log(messages)
    },[messages])

    // useEffect HOOKS


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
                        <Dialog/>
                        <Sender sendMessage={sendMessage}/>
                    </main>
                </div>
            )}
        </div>
    );
}

export default App;
