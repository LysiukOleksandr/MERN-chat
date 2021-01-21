import React from 'react';
import {AddRoom, Room} from "./index";

const Rooms = ({rooms, searchValue, connectTo, searchRooms, onCreateRoom}) => {
    return (
        <div>
            <aside className='rooms'>
                <div className="rooms__search">
                    <h3>Rooms</h3>
                    <input type="text" placeholder='Search room' value={searchValue}
                           onChange={(e) => searchRooms(e.target.value)}/>
                </div>

                <AddRoom onCreateRoom={onCreateRoom}/>

                <ul className="rooms__items">
                    {/*{rooms && rooms.length > 0 && rooms.map((room) => (*/}
                    {/*    <Room key={room} room={room} connectTo={connectTo}/>*/}
                    {/*))}*/}
                    <Room room={'1'} connectTo={connectTo}/>
                </ul>
            </aside>
        </div>
    );
};

export default Rooms;
