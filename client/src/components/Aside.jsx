import React from 'react';
import {User, UserItem} from "./index";

const Aside = ({userName, activeUsers}) => {
    return (
        <aside className="aside">
            <User userName={userName}/>
            <div className="aside__bottom">
                <div className="aside__bottom-active">
                    <h3 className="aside__bottom-title">Active users</h3>
                    <ul className="aside__bottom-list">

                        {activeUsers && activeUsers.map((item, index)=>(
                            <UserItem key={item.id} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
