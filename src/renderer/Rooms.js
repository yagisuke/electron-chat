import React, { Component } from 'react'
import RoomTemplate from './RoomTemplate'

const ICON_CHAT_STYLE = {
    fontSize: 120,
    color: '#DDD'
}

class Room extends Component {
    render() {
        return (
            <RoomTemplate>
                <div className='text-center'>
                    <div style={ICON_CHAT_STYLE}>
                        <span className='icon icon-chat' />
                    </div>
                    <p>
                        Join a chat room from the sidebar or create your chat room.
                    </p>
                </div>
            </RoomTemplate>
        )
    }
}

export default Room