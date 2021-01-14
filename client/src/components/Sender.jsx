import React from 'react';

const Sender = ({onChangeMessage, sendMessage, message}) => {

    const onClickBtn = () =>{
        sendMessage()
        const el = document.getElementById('senderInput')
        el.focus()
    }

    return (
        <section className='sender'>
            <div className="container">
                <div className="sender__wrapper">
                    <div className="sender__input">
                        <input id='senderInput' type="text" placeholder='Type a new message' value={message}
                               onChange={(e) => onChangeMessage(e.target.value)}/>
                    </div>
                    <div className="sender__btn" onClick={onClickBtn}>Send</div>
                </div>
            </div>
        </section>
    )
}

export default Sender;
