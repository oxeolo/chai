import React from 'react';
import './loginPage.css';
import PageLogoView from '../../components/UI/views/PageLogoView';
import LoginFormContainer from '../../components/Login/containers/LoginFormContainer';

const LoginPage = () => (
    <div className = 'loginPage'> 
        <PageLogoView/>       
        <LoginFormContainer/>
    </div>
)

const Circle = () => (
    <div className = 'circle'/>
) 

export default LoginPage;

