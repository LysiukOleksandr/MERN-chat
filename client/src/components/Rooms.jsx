import React, {useState, useEffect} from 'react';
import {Room} from "./index";

const Rooms = ({rooms}) => {
    return (
        <div>
            <aside className='rooms'>
                <div className="rooms__search">
                    <h3>Search room</h3>
                    <input type="text" placeholder='Search room'/>
                </div>
                <ul className="rooms__items">
                    {rooms && rooms.length > 0 && rooms.map((room)=>(
                        <Room key={room} room={room} />
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default Rooms;
