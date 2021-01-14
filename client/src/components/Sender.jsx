import React, {useEffect} from 'react';

const Sender = ({onChangeMessage, sendMessage, message}) => {

    const onSubmit = () => {
        sendMessage()
        const el = document.getElementById('senderInput')
        el.focus()
    }

    const onPressEnter = (e) =>{
        if(e.key !== 'Enter') return;
        onSubmit()
    }

    return (
        <section className='sender'>
            <div className="container">
                <div className="sender__wrapper">
                    <div className="sender__input" onKeyDown={onPressEnter}>
                        <input id='senderInput' type="text" placeholder='Type a new message' value={message}
                               onChange={(e) => onChangeMessage(e.target.value)}/>
                    </div>
                    <div className="sender__btn" onClick={onSubmit}>Send</div>
                </div>
            </div>
        </section>
    )
}

export default Sender;
