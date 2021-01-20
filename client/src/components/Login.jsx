import React from 'react';
import {Error} from "./index";

const Login = ({connectTo, userName, room, onChangeUserName, onChangeRoom, isConnected}) => {


    const onKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        onSubmit()
    }

    const onSubmit = () => {
        connectTo()
    }

    return (
        <section className="login" onKeyDown={onKeyDown}>
            <div className="login__wrapper">
                {isConnected ? (
                    <div className="login__content">
                        <h1>Please, enter your username</h1>
                        <input type="text" placeholder='name' value={userName}
                               onChange={(e) => onChangeUserName(e.target.value)}/>
                        <h1>Room</h1>
                        <input type="text" placeholder='room' value={room}
                               title={"Enter a room only if you want to create it"}
                               onChange={(e) => onChangeRoom(e.target.value)}/>
                        <button type="button" onClick={onSubmit}>Enter</button>
                    </div>
                ):(
                    <Error/>
                )}

            </div>
        </section>
    );
};

export default Login;
