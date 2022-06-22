import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    height: 5rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;

    text-decoration: none;
    border-radius: 8px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    outline: none;

    color: ${({ theme }) => theme.colors.text_inner};
    font: ${({ theme }) => theme.fonts.strong};
    font-size: 1.8rem;
`;
