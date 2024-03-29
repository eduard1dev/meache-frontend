import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  padding: 0 32px 0;
  color: ${(props) => props.theme.colors.text};

  font: ${(props) => props.theme.fonts.normal};
  text-align: center;

  h1 {
    margin: 40px 0;
    font-size: 3.2rem;
  }

  h3 {
    align-self: flex-start;
    font-size: 1.6rem;
  }

  section.section-add-buttons {
    display: flex;
    flex-direction: column;
    width: 100%;

    ${({theme}) => theme.gap_column(2)}

    button {
      height: 60px;
      width: 100%;
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${(props) => props.theme.colors.primary};
      border: none;
      font: ${(props) => props.theme.fonts.strong};
      font-size: 1.6rem;
      cursor: pointer;
      color: ${({theme}) => theme.colors.text_inner};
    }
  }

  section.section-edit-buttons {
    display: flex;
    flex-direction: column;
    ${({theme}) => theme.gap_column(2)}
    width: 100%;
    border-top: solid ${(props) => props.theme.colors.primary} 2px;
    border-radius: 6px;
    padding: 10px 28px 28px 28px;
    background-color: ${(props) => props.theme.colors.grey};
    text-align: left;
    margin-bottom: 60px;
    color: ${(props) => props.theme.colors.text};

    button {
      height: 60px;
      width: 100%;

      cursor: pointer;
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      background-color: ${(props) => props.theme.colors.primary};
      border: none;
      font: ${(props) => props.theme.fonts.strong};
      font-size: 1.6rem;
      color: ${(props) => props.theme.colors.text_inner};
    }
  }
`;
