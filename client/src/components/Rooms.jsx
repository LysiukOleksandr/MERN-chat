import React from 'react';

const Rooms = () => {
    return (
        <div>
            <aside className='rooms'>
                <div className="rooms__search">
                    <h3>Search room</h3>
                    <input type="text" placeholder='Search room'/>
                </div>
                <ul className="rooms__items">
                    <li>IT</li>
                </ul>
            </aside>
        </div>
    );
};

export default Rooms;
