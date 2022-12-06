import React, { FormEvent } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage'
import { Navigate, useNavigate } from 'react-router-dom';
import { FormInput, StyledRegister, LogoContainer, ErrorList, ErrorItem } from './styles'
import { GoogleLogin } from '@react-oauth/google'

import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" })
    const loggedIn = getFromLocalStorage("login-state") 
    const navigate = useNavigate()

    const onSubmit = async data => {
        const response = await fetch(`http://localhost:4000/api/v1/users`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const jsonResponse = await response.json();

        if (jsonResponse.error) {
            console.log(response)
        }

        navigate("/signin", { replace: true }) 
    }

    return (
        <StyledRegister>
            { loggedIn && <Navigate to="/welcome" replace /> }

            <form onSubmit={handleSubmit(onSubmit)}>
                <LogoContainer>
                    <img src="logo.png" alt="Wysa logo"/>
                </LogoContainer>

                <h1>register new user_</h1>

                <ErrorMessage 
                    errors={errors}
                    name="username"
                    render={({ messages }) => 
                        messages &&
                        Object.entries(messages).map( ([type, message]) => (
                            type == 'required' ? 
                                <p key={type}>{message}</p>  :
                                <ErrorList>
                                    <figcaption>Please complete all details</figcaption>
                                    <ErrorItem key={type}>{message[0]}</ErrorItem>
                                    <ErrorItem key={type}>{message[1]}</ErrorItem>
                                    <ErrorItem key={type}>{message[2]}</ErrorItem>
                                    <ErrorItem key={type}>{message[3]}</ErrorItem>
                                </ErrorList>
                        ))
                    }
                />

                <FormInput 
                    type="text" 
                    placeholder="username"
                    {...register('username', { 
                        required: "Username is required",
                        maxLength: {
                            value: 20,
                            message: 'the username exceed the max length (20 characters)'
                        },
                        pattern: {
                            value: /^(?=.{4,}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/,
                            message: 
                                [
                                    ' - Minimum of characters is 4', 
                                    ` - Isn't allow _ or . in the beginning`,
                                    ` - Ins't allow __ or ._ or .. inside`,
                                    ` - Ins't allow _ or . at the end`,
                                ],
                        }
                    })}
                />

                {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
                <FormInput 
                    type="email" 
                    placeholder="email" 
                    {...register('email', { required: true })}
                    aria-invalid={errors.email ? "true" : "false" }
                />

                {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
                <FormInput
                    type="password"
                    placeholder="password"
                    {...register('password', { required: true })}
                    aria-invalid={errors.password ? "true" : "false" }
                />

                {errors.confirm_password?.type === 'required' && <p role="alert">Confirm Password is required</p>}
                <FormInput 
                    type="password"
                    name="confirm_password"
                    {...register('confirm_password', { required: true })}
                    placeholder="Confirm Password"
                    aria-invalid={errors.confirm_password ? "true" : "false"}
                />

                <button type="submit">Register</button>
            </form>
        </StyledRegister>
    )
}

export default Register;
