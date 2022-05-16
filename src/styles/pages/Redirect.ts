import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  padding: 40px 32px 0;
  color: #f0f0f0;

  font: ${(props) => props.theme.fonts.normal};
  text-align: center;

  h1.username {
    margin-bottom: 50px;
  }

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-evenly;
  }
`;

export const LinkButton = styled.a`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};

  width: 100%;
  max-width: 500px;

  padding: 40px 20px;
  border-radius: 2px;
  margin-top: 20px;
  border: none;
`;
