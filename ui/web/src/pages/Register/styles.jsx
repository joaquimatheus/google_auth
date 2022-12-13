import styled from "styled-components";

export const StyledRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 50px;
    flex-grow: 1;
    width: 700px;
    margin: 0 auto;

    form {
        width: 500px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: center;
        --switch: calc((var(--secondary-val) - var(--threshold)) * -100%);
        box-shadow: 0 0 0 2px hsla(0, 0%, var(--switch), 70%),
            15px 15px 0 0 hsla(0, 0%, var(--switch), 70%);
        padding: 25px;
    }

    form h1 {
        --switch: calc((var(--secondary-val) - var(--threshold)) * -100%);
        color: hsla(0, 0%, var(--switch), 70%);
    }

    form p {
        font-weight: bold;
        color: hsla(355.5, 78%, 56%, 70%);
    }

    button {
        padding: 15px 20px;
        border-radius: 6px;
        border: none;
        background-color: var(--primary);
        --switch: calc((var(--primary-val) - var(--threshold)) * -100%);
        color: hsla(0, 0%, var(--switch), 70%);
        font-family: inherit;
        font-weight: bold;
        margin-top: 30px;
        cursor: pointer;
        transition: all 0.4s ease;
    }
`;

export const LogoContainer = styled.div`
    height: 100%;
    display: grid;
    place-content: center;

    img {
        width: 150px;
    }
`;

export const FormInput = styled.input`
    padding: 15px 20px;
    border: solid 2px transparent;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.08);
    background-color: var(--secondary);
    border-radius: 6px;
    outline: none;
    font-family: inherit;
    transition: background-color 0.4s ease;

    --switch: calc((var(--secondary-val) - var(--threshold)) * -100%);
    color: hsla(0, 0%, var(--switch), 70%);

    &:focus {
        border-color: var(--primary);
    }
    &:invalid {
        border-color: red;
    }
    &::placeholder {
        color: inherit;
        transition: color 0.4s ease;
    }
`;

export const ErrorList = styled.ul`
    font-weight: bold;
    color: hsla(355.5, 78%, 56%, 70%);
    list-style-type: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 1em;
    background-color: var(--secondary);
    border: solid hsla(355.5, 78%, 56%, 70%);
    border-radius: 6px;

    figcaption {
        --switch: calc((var(--secondary-val) - var(--threshold)) * -100%);
        color: hsla(0, 0%, var(--switch), 70%);
        text-align: left;
        margin-bottom: 0.3em;
    }
`;

export const ErrorItem = styled.li`
    list-style: none;
    position: relative;
    padding: 3px 0 2px 25px;
`;
