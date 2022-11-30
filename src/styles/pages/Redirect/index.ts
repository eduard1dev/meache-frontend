import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding: 100px 32px;
  color: ${(props) => props.theme.colors.text};

  font: ${(props) => props.theme.fonts.normal};
  text-align: center;

  h1.username {
    margin-bottom: 50px;
  }
`;
