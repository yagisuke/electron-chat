import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import * as firebase from 'firebase'
import Const from '../const'
import Signin from './Signin'
import Signup from './Signup'
import Rooms from './Rooms'
import Room from './Room'

const { FIREBASE_CONFIG } = Const

// routingの定義
const appRouting = (
    <HashRouter>
        <Switch>
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/rooms' component={Rooms} />
            <Route path='/rooms/:roomId' component={Room} />
            <Redirect to='/signin' />
        </Switch>
    </HashRouter>
)

// firebaseの初期化
firebase.initializeApp(FIREBASE_CONFIG)

render(
    appRouting,
    document.getElementById('app')
)