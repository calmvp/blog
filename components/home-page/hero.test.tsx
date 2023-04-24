import { screen, render } from "@testing-library/react";
import Hero from "./hero";

describe('Hero', () => { 
  test('displays a header with the name of the blog owner', () => {
    render(<Hero />);
    const header = screen.getByRole('heading');
    expect(header).toHaveTextContent(/ned/i);
  });
});