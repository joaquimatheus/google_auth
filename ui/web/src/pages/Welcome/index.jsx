import React from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage';
import { StyledWelcome } from './styles';
import { Navigate } from 'react-router-dom'

import Logout from '../../components/Logout'

const Welcome = () => {
    const loggedIn = getFromLocalStorage('login-state');
    
    return (
        <StyledWelcome>
            {!loggedIn && <Navigate to="/" replace />}

            <h1>Welcome you are logged!</h1>
            <Logout />
        </StyledWelcome>
    )
}

export default Welcome;
