import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  height: 100vh;

  padding: 0 32px 0;
  color: ${(props) => props.theme.colors.text};

  font: ${(props) => props.theme.fonts.normal};
  text-align: center;

  h1 {
    font-size: 2.4rem;
  }

  h3 {
    align-self: flex-start;
  }

  section {
    display: flex;
    flex-direction: column;

    width: 100%;
    align-items: center;
    padding: 8px 12px 28px;
    ${({theme}) => theme.gap_column(2.4)}
    
    border-top: solid ${(props) => props.theme.colors.primary} 2px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.colors.grey};

    text-align: center;
    color: ${(props) => props.theme.colors.text};

  }
`;
