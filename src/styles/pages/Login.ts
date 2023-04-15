import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;

  color: ${({ theme }) => theme.colors.text};

  text-align: center;

  @media (max-width: 860px) {
    flex-direction: column;
  }

  aside {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:first-of-type {
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(red, transparent),
          linear-gradient(to top left, lime, transparent),
          linear-gradient(to top right, blue, transparent);
        background-blend-mode: screen;
        z-index: -1;

        @media (max-width: 860px) {
          width: 100%;
          height: 50%;
        }
      }

      h1 {
        font-size: 3rem;
      }
    }
  }

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 2.6rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 25px 0;
    padding: 28px;
    border-radius: 6px;
    width: 100%;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.grey};
    font-size: 1.6rem;

    > div:nth-of-type(1) {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;

      ${({ theme }) => theme.gap_column(0.6)};
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      margin-left: 1rem;
    }
  }
`

export const MotionDiv = styled(motion.div)`
  border-radius: 0.5rem;

  position: absolute;
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
  justify-content: center;

  font: ${(props) => props.theme.fonts.strong};

  /* background: linear-gradient(red, transparent),
    linear-gradient(to top left, lime, transparent),
    linear-gradient(to top right, blue, transparent);
  background-blend-mode: screen;
  z-index: -1; */
`
