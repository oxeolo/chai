import React from 'react';
import './landingPage.css';

import LandingLogoView from '../../components/Landing/views/LandingLogoView';

const LandingPage = () => (
    <div className = 'landingPage'>
        <LandingLogoView/>
        <Circle/>
    </div>
)

const Circle = () => (
    <div className = 'circle'/>
)

export default LandingPage;