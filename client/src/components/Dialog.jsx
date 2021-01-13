import React, {useEffect, useState} from 'react';
import {Message} from "./index";

const Dialog = ({messages, userData}) => {
 // тут мессседжи храню
    const [messagesOffset, setMessagesOffset] = useState([])

// коллбек который в месседжи кидаю
    const getOffsetTop = (obj) => {
        setMessagesOffset([...messagesOffset, obj])
    }
        // функция на скролл, кст обрати внимание на консоль, ебать там зацикленность херачит, я просто донт андестенд (
    const onScrollContent = (e) => {
        let scrollTop = e.target.scrollTop + 550
        if(scrollTop >= 930) {
             console.log(messagesOffset.find(i => i.offsetTop >= scrollTop) || false)
            // console.log(scrollTop, ' scroll')
        }
    }
    useEffect(() => {
        document.querySelector('.dialog__content').addEventListener('scroll', onScrollContent)
    },[])


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
