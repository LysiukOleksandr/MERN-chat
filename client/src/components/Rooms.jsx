import React from 'react';
import {Room} from "./index";

const Rooms = () => {
    return (
        <div>
            <aside className='rooms'>
                <div className="rooms__search">
                    <h3>Search room</h3>
                    <input type="text" placeholder='Search room'/>
                </div>
                <div className="rooms__logout">
                    <button>Leave</button>
                </div>
                <ul className="rooms__items">
                    <Room/>
                </ul>
            </aside>
        </div>
    );
};

export default Rooms;
