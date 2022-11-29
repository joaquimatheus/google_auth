import styled from 'styled-components'

export const Icon = styled.i`
    display: block;
    height: ${(props) => (props.size ? props.size : '10px')};
    width: ${(props) => (props.size ? props.size : "10px")};
    background-color: ${(props) =>
        props.color ? props.color : "var(--primary)"};
    transition: background-color 0.4s ease;
    mask-image: url(${(props) => props.src});
    mask-repeat: no-repeat;;
    mask-size: contain;
    mask-position: center center;
`
