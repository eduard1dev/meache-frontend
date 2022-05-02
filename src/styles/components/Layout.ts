import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    flex: 1;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px;
    font-size: 32px;
    
    background-color: ${({theme} )=> theme.colors.grey};

    button {
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${(props) => props.theme.colors.grey};
      border: none;
      padding: 20px 0 20px 0;
      font: ${(props) => props.theme.fonts.normal};
      color: ${(props) => props.theme.colors.text};
      font-size: 16px;
    }
`;
