import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Errors from './Errors'

const FORM_STYLE = {
    margin: '0 auto',
    padding: 30
}

const SIGNUP_LINK_STYLE = {
    display: 'inline-block',
    marginLeft: 10
}

class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.userEmail || '',
            password: localStorage.userPassword || '',
            errors: []
        }

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this)
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    handleOnChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleOnChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleOnSubmit(e) {
        const { email, password } = this.state
        const errors = []
        let isValid = true

        e.preventDefault()

        if (!email.length) {
            isValid = false
            errors.push('Email can not be blank.')
        }

        if (!password.length) {
            isValid = false
            errors.push('Password can not be blank.')
        }

        if (!isValid) {
            this.setState({ errors })
            return
        }

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            // 次回ログイン簡略化のため、localStorageに値を保存
            localStorage.userEmail = email
            localStorage.userPassword = password
            // チャットルーム一覧画面へ遷移
            this.props.history.push('/rooms')
        }).catch(() => {
            // firebaseでログインエラーとなった場合
            this.setState({ errors: ['Incorrect email or password'] })
        })
    }    

    render() {
        return (
            <form style={FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                <div className='form-group'>
                    <label>Email address</label>
                    <input
                        type='email'
                        className='form-control'
                        placeholder='email'
                        onChange={this.handleOnChangeEmail}
                        value={this.state.email}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        placeholder='password'
                        onChange={this.handleOnChangePassword}
                        value={this.state.password}
                    />
                </div>
                <div className='form-group'>
                    <button
                        type='button'
                        className='btn btn-large btn-default'
                        onClick={this.handleOnSubmit}
                    >
                        signin
                    </button>
                    <div style={SIGNUP_LINK_STYLE}>
                        <Link to='/signup'>create new account</Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default Signin