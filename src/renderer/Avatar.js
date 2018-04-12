import React, { Component } from 'react'

const AVATAR_STYLE = {
    width: 32,
    textAlign: 'center',
    fontSize: 24
}

function Avatar(props) {
    const { photoURL } = props.user

    if (photoURL) {
        return <img src={photoURL} className='img-rounded' style={AVATAR_STYLE} />
    }

    return (
        <div style={AVATAR_STYLE}>
            <span className='icon icon-user' />
        </div>
    )
}

export default Avatar