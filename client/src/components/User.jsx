import React from 'react';

const User = ({user, isConnected}) => {
    return (
        <div className="aside__top">
            {isConnected && <h2 className="aside__username">{user && user.value}</h2>
            }
        </div>
    );
};

export default User;
