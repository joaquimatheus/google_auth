import React, { FormEvent } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage'
import { Navigate, useNavigate } from 'react-router-dom';
import { FormInput, LogoContainer, StyledLogin } from './styles'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const Login = () => {
    const loggedIn = getFromLocalStorage("login-state")
    const navigate = useNavigate()

    const loginHandler = (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        setToLocalStorage('login-state', true)
        navigate("/welcome", { replace: true })
    }

    return (
        <StyledLogin>
            {loggedIn && <Navigate to="/welcome" replace />}
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
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse)
                    }}
                    onError={() => {
                        console.log("login failed")
                    }}
                />
                <button type="submit">Login</button>
            </form>
        </StyledLogin>
    )
}

export default Login
