import React from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData}) => {
    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content">
                        {messages && messages.reverse().map((item, index) => (
                            <Message {...item} key={index} userData={userData}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dialog;
