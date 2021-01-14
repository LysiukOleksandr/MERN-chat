import React, {useEffect, useState} from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData, readMessage}) => {
    const [messagesOffset, setMessagesOffset] = useState([])

    const getOffsetTop = (obj) => {
        const msg = messagesOffset.find((el) => el.id === obj.id)
        if(msg) return console.log('already added') ;
        console.log('offset')
        if (messagesOffset && messagesOffset.length >= 1) {
            // remove duplicates

            const filteredArr = [...new Map([...messagesOffset, obj].map(item => [item.id, item])).values()]
            setMessagesOffset(filteredArr)
        } else {
            setMessagesOffset([...messagesOffset, obj])
        }
    }
    const onScrollContent = (e) => {
        console.log(e,messagesOffset)
    }

    useEffect(() => {
        const el = document.getElementById('dialogContainer')
        if(el){
            el.addEventListener('scroll', onScrollContent)
            return () =>  el.removeEventListener('scroll', onScrollContent)
        }
    }, [])


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
};

export default Dialog;