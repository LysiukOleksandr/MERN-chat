import React from 'react';
import {Message} from "./index";
import handleViewport from 'react-in-viewport';

const Dialog = ({messages, userData, readMessage}) => {

    const ViewportBlock = handleViewport(Message);

    const onReadMessage = (messageId) => {
        readMessage(messageId)
    }

    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content" id="dialogContainer">
                        {messages && messages.length > 0 && messages.map((m, i) => {
                            if (m.status === 'sent' && m.authorId !== userData.id) {
                                return (<ViewportBlock onEnterViewport={() => onReadMessage(m.messageId)}
                                                       userData={userData} {...m}
                                                       key={m.messageId}/>)
                            } else {
                                return (<ViewportBlock userData={userData} {...m} key={`${m.messageId}_${i}`}/>)
                            }
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dialog;