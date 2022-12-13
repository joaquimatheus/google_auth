import React, { useEffect, useState } from "react";

import ajaxAdapter from "../../helpers/ajaxAdapter";
import { useQuery } from "../../helpers/useQuery";

import { Navigate, useNavigate } from "react-router-dom";
import { FormInput, StyledRecover, LogoContainer } from "./styles";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const RecoverPassword = () => {
    const [ isValid, setIsValid ] = useState(false);
    const query = useQuery();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    useEffect(() => {
        const validateToken = async () => {
            const response = await ajaxAdapter.request(
                `/recover/validate?token=${query.get('token')}`,
                "get",
            );

            if (response.ok) {
                setIsValid(true);
            }
        };

        validateToken();
    }, []);

    console.log(isValid);

    return (
        <StyledRecover>
            <form>
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
