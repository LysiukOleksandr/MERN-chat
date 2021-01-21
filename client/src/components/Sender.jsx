import React, {useState} from 'react';
import classNames from 'classnames'

const Sender = ({sendMessage, isConnected}) => {

    const [message, setMessage] = useState('')

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const onSubmit = () => {
        sendMessage(message)
        const el = document.getElementById('senderInput')
        el.focus()
        setMessage('')
    }

    const onPressEnter = (e) => {
        if (e.key !== 'Enter') return;
        onSubmit()
    }

    return (
        <section className='sender'>
            {isConnected && (
                <div className="container">
                    <div className="sender__wrapper">
                        <div className="sender__input" onKeyDown={onPressEnter}>
                            <input id='senderInput' type="text" placeholder='Type a new message' value={message}
                                   onChange={onChangeMessage}/>
                        </div>
                        <div className={classNames('sender__btn', {
                            "sender__btn--activated": message.length >= 1
                        })} onClick={onSubmit}>Send
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Sender;
