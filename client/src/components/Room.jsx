import React from 'react';

const Room = ({room, connectTo}) => {
    return (
        <li onClick={()=> connectTo(room) }>{room}</li>
    );
};

export default Room;
