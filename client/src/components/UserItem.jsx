import React from 'react';

const UserItem = ({user}) => {
    console.log(user)
    return (
        <li className="aside__bottom-list-item">
            <div className="aside__bottom-user">
                <h3 className="aside__bottom-user-name">
                    {user && user.value}
                </h3>
            </div>
        </li>
    );
};

export default UserItem;
