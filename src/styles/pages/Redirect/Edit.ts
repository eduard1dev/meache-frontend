import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;

  margin-bottom: 32px;
`;

export const AddItemFormContainer = styled.div`
  display: flex;
  width: 100%;

  input {
    background-color: ${({ theme }) => theme.colors.grey};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 100%;

    margin-top: 12px;

    > div {
      display: flex;
      flex-direction: row;

      label {
        display: flex;
        align-items: center;
        font: ${({ theme }) => theme.fonts.normal};
        font-size: 1.6rem;
        background-color: #ddd;
        padding: 10px 20px;
        font-family: sans-serif, Arial;
        font-size: 16px;
        border-radius: 4px;
        height: 52px;
        margin-right: 12px;

        color: ${({ theme }) => theme.colors.text_inner};
      }

      input[type='radio'] {
        display: none;
      }

      input[type='radio'] + label {
        background-color: ${({ theme }) => theme.colors.grey};
        color: ${({ theme }) => theme.colors.primary};
      }

      input[type='radio']:checked + label {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.text_inner};
      }
    }

    select {
      background-color: ${({ theme }) => theme.colors.grey};
      padding: 12px;
      font-size: 1.6rem;

      border-radius: 3px;
      border-color: transparent;
    }
  }
`;
