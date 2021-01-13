import React from 'react';

const User = ({userName}) => {
    return (
        <div className="aside__top">
            <h2 className="aside__username">{userName}</h2>
        </div>
    );
};

export default User;
