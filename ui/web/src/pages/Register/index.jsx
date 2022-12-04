import React, { FormEvent } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../../helpers/storage'
import { Navigate, useNavigate } from 'react-router-dom';
import { FormInput, StyledRegister, LogoContainer } from './styles'
import { GoogleLogin } from '@react-oauth/google'

import { useForm } from 'react-hook-form'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const loggedIn = getFromLocalStorage("login-state") 
    const Navigate = useNavigate()

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

        console.log(data);

        console.log(jsonResponse)
    }

    /*
    const registerHandler = (ev) => {
        ev.preventDefault()

        const FormData = new FormData(ev.target)

        navigate('/', { replace: true })
    }
    */

    return (
        <StyledRegister>
            { loggedIn && <Navigate to="/wellcome" replace /> }

            <form onSubmit={handleSubmit(onSubmit)}>
                <LogoContainer>
                    <img src="logo.png" alt="Wysa logo"/>
                </LogoContainer>

                <h1>register new user_</h1>

                {errors.username?.type === 'required' && <p role="alert">Username is required</p>}
                <FormInput 
                    type="text" 
                    placeholder="username"
                    {...register('username', { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
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
