import { render, screen } from "@testing-library/react"
import Logo from "./logo"

describe('logo', () => {
  test('renders a text based logo', () => {
    render(<Logo />)
    const expected = /cicero's statecraft, philosophy, and towing/i;
    expect(screen.getByText(expected)).toBeInTheDocument();
  })
})