import {useState, useEffect} from 'react'
import {Aside, Dialog, Login, Sender} from "./components";
import io from 'socket.io-client'

let socket;

const CONNECTION_PORT = 'localhost:8000/'

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)

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
            socket.emit('send_message', message)
        }
    }


    // useEffect HOOKS

    useEffect(() => {
        socket.on('set_user', (user) => {
            setUserData(user)
        })
    }, [])


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
                    <Aside/>
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
