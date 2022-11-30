import styled from 'styled-components';
import Modal from 'react-modal';

export const ModalContainer = styled(Modal)`
  position: fixed;
  display: flex;
  top: 0;
  flex-direction: column;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: 'center';
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  margin: auto;
  width: min-content;
  height: min-content;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.2rem;
  z-index: 1031;
  border-width: 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  align-self: center;
`;

export const ModalTitle = styled.h1`
  text-align: center;
`;
