import React from 'react';

const UserItem = ({item}) => {
    return (
        <li className="aside__bottom-list-item">
            <div className="aside__bottom-user">
                <h3 className="aside__bottom-user-name">
                    {item.value}
                </h3>
            </div>
        </li>
    );
};

export default UserItem;
