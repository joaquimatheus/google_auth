import React from "react";
import { getFromLocalStorage, setToLocalStorage } from "../../helpers/storage";

import ajaxAdapter from "../../helpers/ajaxAdapter";

import { Navigate, useNavigate } from "react-router-dom";
import { FormInput, StyledForget, LogoContainer } from "./styles";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const navigate = useNavigate();

    const onForget = async (data) => {
        console.log(data);

        const response = await ajaxAdapter.request(
            "/recover/forget-password",
            "post",
            data
        );

        console.log(response);

        // only in dev env this behavior
        navigate(`/recover-password?token=${response.token}`)
    };

    return (
        <StyledForget>
            <form onSubmit={handleSubmit(onForget)}>
                <h2>Enter your email to recover your password</h2>

                <FormInput
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                    })}
                />
                <button type="submit">Submit</button>
            </form>
        </StyledForget>
    );
};

export default ForgetPassword;
