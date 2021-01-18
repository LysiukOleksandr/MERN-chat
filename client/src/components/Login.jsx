import React, {useState} from 'react';

const Login = ({connectTo}) => {

    const [userName, setUserName] = useState('')

    const onChangeUserName = (e) => {
        setUserName(e.target.value)
    }

    const onKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        onSubmit()
    }

    const onSubmit = () => {
        connectTo(userName)
    }


    return (
        <section className="login" onKeyDown={onKeyDown}>
            <div className="login__wrapper">
                <div className="login__content">
                    <h1>Please, enter your username</h1>
                    <input type="text" placeholder='name' onChange={onChangeUserName}/>
                    <h1>Create room</h1>
                    <input type="text" placeholder='room' title={"Enter a room only if you want to create it"}/>
                    <button type="button" onClick={onSubmit}>Enter</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
