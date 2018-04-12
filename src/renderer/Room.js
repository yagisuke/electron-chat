import React, { Component } from 'react'
import RoomItem from './RoomItem'
import firebase from 'firebase'

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: '#DDD'
}

const FORM_STYLE = {
    display: 'flex'
}

const BUTTON_STYLE = {
    marginLeft: 10
}

class Room extends Component {
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
        const { roomName } = this.state
        
        e.preventDefault()

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
                this.props.push(`/rooms/${newRoomRef.key}`)
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

    renderRoomList() {
        const { roomId } = this.props.params
        const { rooms, roomName } = this.state

        return (
            <div className='list-group'>
                {romms.map(r => <RoomItem key={r.key} room={r} selected={r.key === roomId} />)}
                <div className='list-group-header'>
                    <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                        <input
                            type="text"
                            classname='form-control'
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
        )
    }

    renderRoom() {
        if (this.props.children) {
            return this.props.children
        }

        return (
            <div className='text-center'>
                <div style={ICON_CHAT_STYLE}>
                    <span className='icon icon-chat' />
                </div>
                <p>
                    Join a chat room from the sidebar or create your chat room.
                </p>
            </div>
        )
    }

    render() {
        return (
            <div className='pane-group'>
                <div className='pane-sm sidebar'>{this.renderRoomList()}</div>
                <div className='pane'>{this.renderRoom()}</div>
            </div>
        )
    }
}

export default Room