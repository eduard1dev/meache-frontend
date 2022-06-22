import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  padding: 0 32px 0;
  color: ${({theme}) => theme.colors.text};

  h1 {
    color: ${({theme}) => theme.colors.text};
  }

  font: ${({theme}) => theme.fonts.normal};
  text-align: center;
`;
