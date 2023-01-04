import styled from "styled-components";

export const StyledAvatarSet = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }
    
    .title-container {
        h1 {
            --switch: calc((var(--secondary-val) - var(--threshold)) * -100%);
            color: hsla(0,0%,var(--switch),70%);
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: 0.4rem;
        cursor: pointer;
        border-radius: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: #4e0eff;
        }
    }
`
