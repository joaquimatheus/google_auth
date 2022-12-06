import React from 'react';
import { useNavigate } from 'react-router-dom'
import { LogoutStyled } from './styles';

import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage';

function Logout() {
    const loggedIn = getFromLocalStorage("login-state")
    const navigate = useNavigate();

    const logoutHandler = (ev) => {
        setToLocalStorage("login-state", false)
        navigate('/signin', { replace: true })
    }

    return (
        <>
            {loggedIn && (
                <LogoutStyled onClick={logoutHandler}>Logout</LogoutStyled>
            )}
        </>
    )
}

export default Logout;
