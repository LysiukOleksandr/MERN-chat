import React from 'react';
import {Message} from "./index";

const Dialog = () => {


    return (
        <section className="dialog">
            <div className="container">
                <div className="dialog__wrapper">
                    <h1 className="dialog__title">Chat</h1>
                    <div className="dialog__content" id="dialogContainer">
                        <Message/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dialog;