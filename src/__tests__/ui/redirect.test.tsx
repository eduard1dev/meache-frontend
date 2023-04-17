import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Redirect from '../../pages/[userUrl]'
import '@testing-library/jest-dom'
import data from '../__mocks__/userLinks.json'
import { ThemeProvider } from 'styled-components'
import theme from '../../styles/theme'

describe('Testing user links pages', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Redirect userLinks={data} />
      </ThemeProvider>
    )
  })
  it('should show 4 links buttons', () => {
    const linkButtons = screen.getAllByRole('link')
    expect(linkButtons.length).toBe(4)
  })

  it('should exist a href link and redirect to it on click link button', async () => {
    const linkButton = screen.getAllByRole('link')

    fireEvent.click(linkButton[0])

    waitFor(() => {
      expect(window.location.href).toBe(linkButton[0].getAttribute('href'))
    })
  })
})
