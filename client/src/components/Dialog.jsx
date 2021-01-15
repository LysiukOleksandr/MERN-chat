import React from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData}) => {


    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content" id="dialogContainer">
                        {messages && messages.map((m) => (
                            <Message userData={userData} {...m} key={m.messageId}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dialog;