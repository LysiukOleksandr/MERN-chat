import React from 'react';
import {Message} from "./index";

const Dialog = ({messages, userName}) => {
    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content">
                        {messages && messages.reverse().map((item, index) => (
                            <Message {...item} key={index} userName={userName}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dialog;
