import React, {useEffect, useState, useCallback} from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData, readMessage}) => {
    const [messagesOffset, setMessagesOffset] = useState([])

    const getOffsetTop = (obj) => {
        setMessagesOffset([...messagesOffset, obj])
    }
    const onScrollContent = useCallback((e) => {
        let scrollTop = e.target.scrollTop + 550
        console.log(messagesOffset)
        if (scrollTop >= 550 ) {
            console.log(messagesOffset.find(i => i.offsetTop >= scrollTop))
        }
    }, [messagesOffset])
    useEffect(() => {
        document.querySelector('.dialog__content').addEventListener('scroll', onScrollContent)
    }, [onScrollContent])


    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content">
                        {messages && messages.reverse().map((item, index) => (
                            <Message {...item} key={index} userData={userData} getOffsetTop={getOffsetTop}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dialog;
