import React, {useEffect, useState, useCallback} from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData, readMessage}) => {
    const [messagesOffset, setMessagesOffset] = useState([])

    const getOffsetTop = useCallback((obj) => {

        const msg = messagesOffset.find((el) => el.id === obj.id)
        if (msg) return console.log('already added');

        if (messagesOffset && messagesOffset.length >= 1) {

            // remove duplicates
            const filteredArr = [...new Map([...messagesOffset, obj].map(item => [item.id, item])).values()]
            setMessagesOffset(filteredArr)
        } else {
            setMessagesOffset([...messagesOffset, obj])
        }
    }, [messagesOffset])


    const onReadContent = useCallback((e) => {
        let scrollTop = e.target.scrollTop + 550
        const foundMessage = messagesOffset.find((i) => scrollTop > i.offsetTop) || null

        if (foundMessage) {
            const filteredMessagesOffset = messagesOffset.filter((i) => i.id !== foundMessage.id)
            console.log('FILTERED_MESSAGE: ', filteredMessagesOffset)
            setMessagesOffset(filteredMessagesOffset)
            readMessage(foundMessage.id)
        }

    }, [messagesOffset])

    useEffect(() => {
        const el = document.getElementById('dialogContainer')
        if (el) {
            el.addEventListener('scroll', onReadContent)
            return () => el.removeEventListener('scroll', onReadContent)
        }
    }, [onReadContent])


    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content" id="dialogContainer">
                        {messages && messages.reverse().map((item, index) => (
                            <Message {...item} key={index} userData={userData} getOffsetTop={getOffsetTop}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
// , (prevProps, nextProps) => {
//     return prevProps.messages.length === nextProps.messages.length;
// })

export default Dialog;