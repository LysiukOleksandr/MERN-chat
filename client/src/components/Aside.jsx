import React from 'react';
import {User, UserItem} from "./index";

const Aside = ({user, users, onLeave, unreadMessagesLength, isConnected}) => {

    return (
        <aside className="aside">
            <User user={user} isConnected={isConnected}/>
            <div className="aside__bottom">
                {isConnected && (
                    <div className="aside__bottom-active">
                        <div className="aside__bottom-unread">{unreadMessagesLength}</div>
                        <div className="aside__logout">
                            <button onClick={onLeave}>Leave</button>
                        </div>
                        <h3 className="aside__bottom-title">Active users</h3>
                        <ul className="aside__bottom-list">
                            {users && users.length && users.map((user)=>(
                                <UserItem user={user} key={user.id} />
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </aside>
    );
};

export default Aside;
