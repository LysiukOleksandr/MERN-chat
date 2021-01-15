import React from 'react';

const User = ({user}) => {
    return (
        <div className="aside__top">
            <h2 className="aside__username">{user && user.value}</h2>
        </div>
    );
};

export default User;
