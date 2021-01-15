import React, {useState} from 'react';

const Sender = ({sendMessage}) => {

    const [message, setMessage] = useState('')

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = () => {
        sendMessage(message)
        const el = document.getElementById('senderInput')
        el.focus()
    }

    const onPressEnter = (e) => {
        if (e.key !== 'Enter') return;
        onSubmit()
    }


    return (
        <section className='sender'>
            <div className="container">
                <div className="sender__wrapper">
                    <div className="sender__input" onKeyDown={onPressEnter}>
                        <input id='senderInput' type="text" placeholder='Type a new message' value={message}
                               onChange={onChangeMessage}/>
                    </div>
                    <div className="sender__btn" onClick={onSubmit}>Send</div>
                </div>
            </div>
        </section>
    )
}

export default Sender;
