import React from 'react';
import {Error, Message} from "./index";
import handleViewport from 'react-in-viewport';

const Dialog = ({messages, userData, readMessage, isConnected}) => {

    const ViewportBlock = handleViewport(Message);

    const onReadMessage = (messageId) => {
        readMessage(messageId)
    }

    return (
        <section className="dialog">
            <div className="container">
                {isConnected ? (
                    <div className="dialog__wrapper">
                        <h1 className="dialog__title">{userData && userData.room}</h1>
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
                ):(
                    <Error/>
                )}

            </div>
        </section>
    );
}

export default Dialog;