import React, { FormEvent } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage'
import { Navigate, useNavigate } from 'react-router-dom';
import { FormInput, LogoContainer, StyledLogin } from './styles'

const Login = () => {
    const loggedIn = getFromLocalStorage("login-state")
    const Navigate = useNavigate()

    const loginHandler = (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        setToLocalStorage('login-state', true)
        navigate("/", { replace: true })
    }

    return (
        <StyledLogin>
            {loggedIn && <Navigate to="/" replace />}
            <LogoContainer>
                <img src="logo.png" alt="Wysa Logo"/>
            </LogoContainer>

            <div className="seperator" />

            <form action="/" onSubmit={loginHandler}>
                <FormInput type="email" name="email" placeholder="Email" required/>
                <FormInput 
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </StyledLogin>
    )
}

export default Login