import React, {Component} from 'react';
import './loginFormView.css';

import InputView from '../../UI/views/InputView';
import {LinkButtonView} from '../../UI/views/ButtonView';

const LoginFormView = () => (
    <div className = 'loginForm'>
        <InputView
            placeholder = {'email'}
        />
        <InputView
            placeholder = {'password'}
            type = {'password'}
        />
        <LinkButtonView to='/books'>
            login
        </LinkButtonView>
    </div>
)

export default LoginFormView;