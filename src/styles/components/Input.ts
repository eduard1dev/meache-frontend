import styled from 'styled-components'

export const Input = styled.input`
    height: 52px;
    width: 100%;
    padding-left: 10px;

    text-decoration: none;
    border-radius: 8px;
    background-color: ${({theme}) => theme.colors.background};
    border: 2px solid ${({theme}) => theme.colors.background};

    &:focus {
        border-color: ${({theme}) => theme.colors.primary};
    }

    outline: 0px;

    transition: border 0.2s ease 0s;

    font: ${props => props.theme.fonts.normal};
    color: ${({theme}) => theme.colors.text};
`