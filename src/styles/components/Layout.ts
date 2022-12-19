import styled from 'styled-components';
import theme from '../theme';

export const HeaderContainer = styled.header`
  display: flex;
  flex: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;

  @media (max-width: 600px) {
    height: 80px;
  }

  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font: ${(props) => props.theme.fonts.logo};

    @media (max-width: 600px) {
      top: none;
      bottom: 5%;
    }
  }

  background-color: ${({ theme }) => theme.colors.grey};

  button {
    margin-left: auto;
    text-decoration: none;
    border-radius: 8px;
    text-align: center;
    background-color: ${(props) => props.theme.colors.grey};
    border: none;
    font: ${(props) => props.theme.fonts.light};
    color: ${(props) => props.theme.colors.text};
    font-size: 1.6rem;
  }

  .back_icon {
    font-size: 3rem;
    margin-right: auto;
  }
`;
