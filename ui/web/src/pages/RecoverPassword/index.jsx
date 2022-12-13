import React, { useEffect, useState } from "react";

import ajaxAdapter from "../../helpers/ajaxAdapter";

import { useQuery } from "../../helpers/useQuery";

import { Navigate, useNavigate } from "react-router-dom";
import { FormInput, StyledRecover, LogoContainer } from "./styles";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { getFromLocalStorage } from "../../helpers/storage";

const RecoverPassword = () => {
    const [ isValid, setIsValid ] = useState(null);
    const query = useQuery();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    useEffect(() => {
        const validateToken = async () => {
            const response = await ajaxAdapter.request(
                `/recover/validate?token=${query.get('recovery')}`,
                "get",
            );

            if (response.ok == true) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        };

        validateToken();
    }, []);

    const onNewPassword = async (data) => {
        const token = query.get('recovery');
        data['token'] = token;

        delete token.confirm_password;

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

        const response = await ajaxAdapter.request("/recover/set-new-password", "post", data);

        if (response.ok) {
            alert('Your password is restored, is redirect to login page');

            await sleep(5000);
            navigate('/signin')
        }
    }

    return (
        <StyledRecover>
            { isValid == false && <Navigate to="/forget-password" replace /> }
            <form onSubmit={handleSubmit(onNewPassword)}>
                <h2>Set your new password</h2>

                <FormInput
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />

                <FormInput
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirm_password", {
                        required: "Confirm Password is required",
                    })}
                />
                <button type="submit">Submit</button>
            </form>
        </StyledRecover>
    );
};

export default RecoverPassword;
