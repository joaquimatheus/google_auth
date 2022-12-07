import React, { FormEvent } from "react";

import { getFromLocalStorage, setToLocalStorage } from "../../helpers/storage";
import ajaxAdapter from "../../helpers/ajaxAdapter";

import { Navigate, useNavigate } from "react-router-dom";
import { FormInput, LogoContainer, StyledLogin } from "./styles";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const loggedIn = getFromLocalStorage("jwtToken");
    const navigate = useNavigate();

    const onLogin = async (data) => {
        console.log(data)

        const { json } = ajaxAdapter.request("/users/login", "post", data);

        console.log(json);
    };

    return (
        <StyledLogin>
            {loggedIn && <Navigate to="/welcome" replace />}
            <LogoContainer>
                <img src="logo.png" alt="Wysa Logo" />
            </LogoContainer>

            <div className="seperator" />

            <form action="/" onSubmit={handleSubmit(onLogin)}>
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
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log("login failed");
                    }}
                />
                <button type="submit">Login</button>
            </form>
        </StyledLogin>
    );
};

export default Login;
