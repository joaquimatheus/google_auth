import styled from 'styled-components';

export const LogoutStyled = styled.div`
    height: 40px;
    padding: 10px 20px;
    background-color: var(--primary);
    --switch: calc((var(--primary-val) - var(--threshold)) * -100%);
    color: hsl(0, 0%, var(--switch));
    border-radius: 0px;
    cursor: pointer;
    transition: all 0.4s ease;

`
