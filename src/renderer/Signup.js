import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Errors from './Errors'
import firebase from 'firebase'

const SIGNUP_FORM_STYLE = {
    margin: '0 auto',
    padding: 30
}

const CANCEL_BUTTON_STYLE = {
    maringLeft: 10
}

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            photoURL: '',
            errors: []
        }

        this.handleOnChangeEmail = this.handleOnChangeEmail.bind(this) 
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
        this.handleOnChangeName = this.handleOnChangeName.bind(this) 
        this.handleOnChangePhotoURL = this.handleOnChangePhotoURL.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    handleOnChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleOnChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    handleOnChangeName(e) {
        this.setState({ name: e.target.value })
    }

    handleOnChangePhotoURL(e) {
        this.setState({ photoURL: e.target.value })
    }

    handleOnSubmit(e) {
        const { email, password, name, photoURL } = this.state
        const errors = []
        let isValid = true

        e.preventDefault()

        if (!email.length) {
            isValid = false
            errors.push('Email address can not be blank.')
        }

        if (!password.length) {
            isValid = false
            errors.push('Password can not be blank.')
        }

        if (!name.length) {
            isValid = false
            errors.push('Name can not be blank.')
        }

        if (!isValid) {
            this.setState({ errors })
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(newUser => {
            // ユーザー情報を更新
            return newUser.updateProfile({
                displayName: name,
                photoURL
            })
        }).then(() => {
            // チャットルーム一覧画面へ遷移
            this.props.history.push('/rooms')
        }).catch(err => {
            // firebaseでエラーとなった場合
            this.setState({ errors: [err.message] })
        })
    }

    render() {
        return (
            <form style={SIGNUP_FORM_STYLE} onSubmit={this.handleOnSubmit}>
                <Errors errorMessages={this.state.errors} />
                <div className='form-group'>
                    <label>Email address*</label>
                    <input
                        type='email'
                        className='from-control'
                        placeholder='email'
                        value={this.state.email}
                        onChange={this.handleOnChangeEmail}
                    />
                </div>
                <div className='form-group'>
                    <label>Password*</label>
                    <input
                        type='password'
                        className='from-control'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleOnChangePassword}
                    />
                </div>
                <div className='form-group'>
                    <label>User name*</label>
                    <input
                        type='text'
                        className='from-control'
                        placeholder='user name'
                        value={this.state.name}
                        onChange={this.handleOnChangeName}
                    />
                </div>
                <div className='form-group'>
                    <label>Photo URL</label>
                    <input
                        type='text'
                        className='from-control'
                        placeholder='photo URL'
                        value={this.state.photoURL}
                        onChange={this.handleOnChangePhotoURL}
                    />
                </div>
                <div class='form-group'>
                    <button
                        type='button'
                        className='btn btn-large btn-primary'
                        onClick={this.handleOnSubmit}
                    >
                        create new account
                    </button>
                    <Link to='/login'>
                        <button
                            type='button'
                            style={CANCEL_BUTTON_STYLE}
                            className='btn btn-large btn-default'
                        >
                            cancel
                        </button>
                    </Link>
                </div>
            </form>
        )
    }
}

export default Signup