import React from 'react';
import {User, UserItem} from "./index";

const Aside = ({user, users}) => {
    return (
        <aside className="aside">
            <User user={user}/>
            <div className="aside__bottom">
                <div className="aside__bottom-active">
                    <h3 className="aside__bottom-title">Active users</h3>
                    <ul className="aside__bottom-list">
                        {users && users.length && users.map((user)=>(
                            <UserItem user={user} key={user.id} />
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
