import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./contact-form";
import { server } from "../../test-utils/server";
import { writeContactHandlerException } from "../../test-utils/server-handlers";

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

  test('it should render a "Send Message" button', () => {
    render(<ContactForm />);
    const actual = screen.getByRole('button', { name: /send message/i});
    expect(actual).toBeInTheDocument();
  });

  describe('email input', () => {
    test('it should render a labelled email input', () => {
      render(<ContactForm />);
      const actual = screen.getByLabelText(/email/i);
      expect(actual).toBeInTheDocument();
      expect(actual).toHaveAttribute('type', 'email');
      expect(actual).toHaveAttribute('required');
    });

    test('it should update when user enters text', async () => {
      const expected = 'c.bellagio@gmail.com';
      const user = userEvent.setup();
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, expected);
      expect(emailInput).toHaveValue(expected);
    });
  });

  describe('name input', () => {
    test('it should render a labelled name input', () => {
      render(<ContactForm/>);
      const actual = screen.getByLabelText(/name/i);
      expect(actual).toBeInTheDocument();
      expect(actual).toHaveAttribute('type', 'text');
      expect(actual).toHaveAttribute('required');
    });

    test('it should update when user enters text', async () => {
      const expected = 'Clint Bellagio';
      const user = userEvent.setup();
      render(<ContactForm />);
      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, expected);
      expect(nameInput).toHaveValue(expected);
    });
  });

  describe('message text area', () => {
    test('it should render a labelled message textarea', () => {
      render(<ContactForm />);
      const actual = screen.getByLabelText(/message/i);
      expect(actual).toBeInTheDocument();
      expect(actual).toHaveAttribute('rows');
      expect(actual).toHaveAttribute('required');
    });

    test('it should update when user enters text', async () => {
      const expected = 'The message I am going to send';
      const user = userEvent.setup();
      render(<ContactForm />);
      const messageTextArea = screen.getByLabelText(/message/i);
      await user.type(messageTextArea, expected);
      expect(messageTextArea).toHaveValue(expected);
    });
  });

  describe('notifications', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test('it should render an error notification when the write contact operation fails', async () => {
      server.use(writeContactHandlerException);
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'Clint Bellagio');

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'cbellagio@gmail.com');

      const messageTextArea = screen.getByLabelText(/message/i);
      await user.type(messageTextArea, 'my cool message');

      const submitButton = screen.getByRole('button', { name: /send message/i});
      await user.click(submitButton);

      const notificationTitleElement =  screen.getByText('An Error Occurred');
      const notificationMessageElement = screen.getByText('Request failed with status code 500');

      expect(notificationTitleElement).toBeInTheDocument();
      expect(notificationMessageElement).toBeInTheDocument();
    });

    test('it should render a success notification when the write contact operation completes successfully', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      await user.type(nameInput, 'Clint Bellagio');

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'cbellagio@gmail.com');

      const messageTextArea = screen.getByLabelText(/message/i);
      await user.type(messageTextArea, 'my cool message');

      const submitButton = screen.getByRole('button', { name: /send message/i});
      await user.click(submitButton);

      const notificationTitleElement =  await screen.findByText('Success!');
      const notificationMessageElement = await screen.findByText('Message sent!');

      expect(notificationTitleElement).toBeInTheDocument();
      expect(notificationMessageElement).toBeInTheDocument();
    })
  });
});