import React, {Component} from 'react';
import './landingLogoView.css';
import {LinkButtonView} from '../../UI/views/ButtonView';

const LandingLogoView = () => (
    <div>
        <div className = 'landingLogo'>
            chai
        </div>
        <LinkButtonView to='/app/login'>
            Shall we?
        </LinkButtonView>
    </div>
)

export default LandingLogoView;