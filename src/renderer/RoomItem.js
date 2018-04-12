import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const LINK_STYLE = {
    color: 'inherit',
    textDecoration: 'none'
}

function RoomItem(props) {
    const { selected } = props
    const { description, key } = props.room

    return (
        <div className={selected ? 'list-group-item selected' : 'list-group-item'}>
            <Link to={`/rooms/${key}`} style={LINK_STYLE}>
                <div className='media-body'>
                    <strong>{description}</strong>
                </div>
            </Link>
        </div>
    )
}

export default RoomItem