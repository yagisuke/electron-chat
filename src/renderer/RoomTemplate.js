import React, { Component } from 'react'
import firebase from 'firebase'
import RoomItem from './RoomItem'

const FORM_STYLE = {
    display: 'flex'
}

const BUTTON_STYLE = {
    marginLeft: 10
}

class RoomTemplate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            roomName: '',
            rooms: []
        }

        this.db = firebase.database()
        this.handleOnChangeRoomName = this.handleOnChangeRoomName.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    componentDidMount() {
        this.fetchRooms()
    }

    handleOnChangeRoomName(e) {
        this.setState({ roomName: e.target.value })
    }

    handleOnSubmit(e) {
        e.preventDefault()

        const { roomName } = this.state

        if (!roomName.length) {
            return
        }

        const newRoomRef = this.db.ref('/chatrooms').push()
        const newRoom = {
            description: roomName
        }
        newRoomRef.update(newRoom).then(() => {
            this.setState({ roomName: '' })
            return this.fetchRooms().then(() => {
                this.props.history.push(`/rooms/${newRoomRef.key}`)
            })
        })
    }

    fetchRooms() {
        return this.db.ref('/chatrooms').limitToLast(20).once('value').then(snapshot => {
            const rooms = []
            snapshot.forEach(item => {
                rooms.push(Object.assign({ key: item.key }, item.val()))
            })
            this.setState({ rooms })
        })
    }

    render() {
        const { roomId } = this.props
        const { rooms, roomName } = this.state

        return (
            <div className='pane-group'>
                <div className='pane-sm sidebar'>
                    <div className='list-group'>
                        {rooms.map(r => console.log(r) || <RoomItem key={r.key} room={r} selected={r.key === roomId} />)}
                        <div className='list-group-header'>
                            <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='New room'
                                    onChange={this.handleOnChangeRoomName}
                                    value={roomName}
                                />
                                <button className='btn btn-default' style={BUTTON_STYLE}>
                                    <span className='icon icon-plus' />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='pane'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default RoomTemplate