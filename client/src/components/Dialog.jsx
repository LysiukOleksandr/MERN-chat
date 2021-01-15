import React from 'react';
import {Message} from "./index";
import handleViewport from 'react-in-viewport';

const Dialog = ({messages, userData}) => {

    const ViewportBlock = handleViewport(Message);

    const onReadMessage = (messageId) => {
        console.log(messageId, 'READ')
    }

    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content" id="dialogContainer">
                        {/*{messages && messages.map((m) => (*/}
                        {/*    <ViewportBlock*/}
                        {/*        */}
                        {/*        onEnterViewport={() => console.log('enter')}*/}
                        {/*                   userData={userData} {...m}*/}
                        {/*                   key={m.messageId}/>*/}
                        {/*))}*/}

                        {messages && messages.map((m) => {
                            if (m.status === 'sent' && m.authorId !== userData.id) {
                                return (<ViewportBlock onEnterViewport={() =>onReadMessage(m.messageId)} userData={userData} {...m}
                                                       key={m.messageId}/>)
                            } else {
                                return (<ViewportBlock userData={userData} {...m} key={m.messageId}/>)
                            }
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dialog;