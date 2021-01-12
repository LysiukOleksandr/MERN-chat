import React from 'react';

const Login = () => {
    return (
        <section className="login">
            <div className="login__wrapper">
                <div className="login__content">
                    <h1>Please, enter your email</h1>
                    <input type="text" placeholder='name'/>
                    <button type="submit">Enter</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
