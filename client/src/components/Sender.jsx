import React from 'react';

const Sender = () => {
    return (
        <section className='sender'>
            <div className="container">
                <div className="sender__wrapper">
                    <div className="sender__input"><input type="text" placeholder='Type a new message'/></div>
                    <div className="sender__btn">Send</div>
                </div>
            </div>
        </section>
    )
}

export default Sender;
