import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Signup extends Component {
    render() {
        return (
            <div>
                <h2>Signup</h2>
                <Link to='/rooms'>Create new account</Link>
                <Link to='/signin'>cancel</Link>
            </div>
        )
    }
}