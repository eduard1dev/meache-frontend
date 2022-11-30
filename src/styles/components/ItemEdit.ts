import styled from 'styled-components';
import Button from '../../components/Button';

interface ItemContainer {
  isDragging: boolean;
}

export const TitleItemContainer = styled.input`
  display: flex;
  background-color: 'transparent';
  width: 100%;
  max-width: 500px;
  padding: 40px 20px;

  border: 1px solid black;

  border-radius: 2px;

  font: ${(props) => props.theme.fonts.strong};
  font-size: 22px;
  color: black;
`;

export const LinkItemContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  max-width: 500px;
  padding: 40px 20px;

  //border: 1px solid black;
  border-radius: 2px;

  font: ${(props) => props.theme.fonts.strong};
  font-size: 22px;
  color: ${(props) => props.colorTheme?.primary ?? props.theme.colors.text};
`;

export const ItemContainer = styled.div<ItemContainer>`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;

  opacity: ${({ isDragging }) => (isDragging ? 0.1 : 1)};
`;

export const ButtonRemoveItem = styled(Button)`
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  min-height: 3rem;
  margin-bottom: 0;

  font-size: 1.4rem;

  border-radius: 2px;
`;
