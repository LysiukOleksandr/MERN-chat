import React, {useState} from 'react';

const AddRoom = ({onCreateRoom}) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const onSubmit = () =>{
        onCreateRoom(name,room)
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeRoom = (e) => {
        setRoom(e.target.value)
    }

    const onKeyPress = (e) => {
        if (e.key !== 'Enter') return;
        onSubmit()
    }


    return (
        <div className='add-room' onKeyDown={onKeyPress}>
            <h3 className="add-room__title">Add room</h3>
            <div className="add-room__container">
                <div className="add-room__input">
                    <input type="text" className="add-room__input" placeholder='Enter your username' onChange={onChangeName}/>
                </div>
                <div className="add-room__input">
                    <input type="text" className="add-room__input" placeholder='Enter room' onChange={onChangeRoom}/>
                </div>
                    <button className='add-room__btn' onClick={onSubmit}>Add</button>
            </div>
        </div>
    );
};

export default AddRoom;
