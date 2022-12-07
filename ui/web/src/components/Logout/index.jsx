import React from 'react';
import { useNavigate } from 'react-router-dom'
import { LogoutStyled } from './styles';

import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage';

function Logout() {
    const loggedIn = getFromLocalStorage("jwtToken")
    const navigate = useNavigate();

    const logoutHandler = (ev) => {
        setToLocalStorage("jwtToken", null)
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
