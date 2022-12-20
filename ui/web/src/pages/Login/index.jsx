import React, { FormEvent } from "react";

import { getFromLocalStorage, setToLocalStorage } from "../../helpers/storage";
import ajaxAdapter from "../../helpers/ajaxAdapter";

import { Navigate, useNavigate, Link } from "react-router-dom";
import { FormInput, LogoContainer, StyledLogin, StyledLink } from "./styles";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const loggedIn = getFromLocalStorage("jwtToken");
    const navigate = useNavigate();

    const onLogin = async (data) => {
        console.log(data)

        const response = await ajaxAdapter.request("/users/login", "post", data);
        
        if (response == false) {
            setError('serverSide', {
                type: 'server side',
                message: 'The email or password is wrong'
            })
        }
    };

    return (
        <StyledLogin>
            {loggedIn && <Navigate to="/welcome" replace />}
            <LogoContainer>
                <img src="logo.png" alt="Wysa Logo" />
            </LogoContainer>

            <div className="seperator" />



            <form action="/" onSubmit={handleSubmit(onLogin)}>

                <p>{errors.serverSide && errors.serverSide.message}</p>

                <FormInput
                    type="email"
                    placeholder="Email"
                    { ...register('email', {
                        required: 'Email is required'
                    })}
                />
                <FormInput
                    type="password"
                    placeholder="password"
                    { ...register('password', {
                        required: 'Passowrd is required'
                    })}
                />
                <GoogleLogin
                    onSuccess={ async (credentialResponse) => {
                        const data = { token: credentialResponse.credential };
                        const response = await ajaxAdapter.request("/oauth/google/login", "post", data);
                        console.log(response);

                        if (response.ok) { navigate("/welcome") };
                    }}
                    onError={() => {
                        console.log("login failed");
                    }}
                />
                <StyledLink to="/signup">
                    Dont't have an account?
                </StyledLink>
                <button name="submitField" type="submit">Login</button>
            </form>

        </StyledLogin>
    );
};

export default Login;
