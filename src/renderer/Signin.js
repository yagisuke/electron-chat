import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Signin extends Component {
    render() {
        return (
            <div>
                <h2>Signin</h2>
                <Link to='/signup'>Create new account</Link>
            </div>
        )
    }
}