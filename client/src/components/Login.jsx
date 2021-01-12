import React from 'react';

const Login = ({onChangeUserName, connectToRoom}) => {



    return (
        <section className="login">
            <div className="login__wrapper">
                <div className="login__content">
                    <h1>Please, enter your username</h1>
                    <input type="text" placeholder='name' onChange={(e)=> onChangeUserName(e.target.value)}/>
                    <button type="submit" onClick={connectToRoom}>Enter</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
