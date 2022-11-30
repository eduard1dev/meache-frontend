import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  gap: 42px;

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
      padding: 12px;

      background-color: ${({ theme }) => theme.colors.grey};

      label {
        font: ${({ theme }) => theme.fonts.normal};
        font-size: 1.6rem;
        margin-right: 6px;
      }

      input {
        background-color: ${({ theme }) => theme.colors.primary};
        margin-right: auto;
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
