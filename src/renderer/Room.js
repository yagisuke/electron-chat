import React, { Component } from 'react'

export default class Room extends Component {
    render() {
        const { roomId } = this.props.match.params

        return (
            <div>
                <h3>Room {roomId}</h3>
            </div>
        )
    }
}