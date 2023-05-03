import { screen, render } from "@testing-library/react";
import ContactForm from "./contact-form";

describe('ContactForm', () => {
  test('it should display the header', () => {
    render(<ContactForm />);
    const actual = screen.getByRole('heading', { name: /what ails you/i});
    expect(actual).toBeInTheDocument();
  });

  test('it should render a contact-form element', () => {
    render(<ContactForm />);
    const actual = screen.getByRole('form', { name: 'contact-form' });
    expect(actual).toBeInTheDocument();
  });

  test('it should render a labelled email input', () => {
    render(<ContactForm />);
    const actual = screen.getByLabelText(/email/i);
    expect(actual).toBeInTheDocument();
    expect(actual).toHaveAttribute('type', 'email');
  });

  test('it should render a labelled name input', () => {
    render(<ContactForm/>);
    const actual = screen.getByLabelText(/name/i);
    expect(actual).toBeInTheDocument();
    expect(actual).toHaveAttribute('type', 'text');
  });

  test('it should render a labelled message textarea', () => {
    render(<ContactForm />);
    const actual = screen.getByLabelText(/message/i);
    expect(actual).toBeInTheDocument();
    expect(actual).toHaveAttribute('rows');
  });

  test('it should render a "Send Message" button', () => {
    render(<ContactForm />);
    const actual = screen.getByRole('button', { name: /send message/i});
    expect(actual).toBeInTheDocument();
  });
});