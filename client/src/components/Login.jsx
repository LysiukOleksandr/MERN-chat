import React from 'react';
import {Error} from "./index";

const Login = ({userName, onChangeUserName, isConnected}) => {

    return (
        <section className="login">
            <div className="login__wrapper">
                {isConnected ? (
                    <div className="login__content">
                        <h1>Please, enter your username</h1>
                        <input type="text" placeholder='name' value={userName}
                               onChange={(e) => onChangeUserName(e.target.value)}/>
                    </div>
                ) : (
                    <Error/>
                )}

            </div>
        </section>
    );
};

export default Login;
