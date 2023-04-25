import { render, screen, within } from "@testing-library/react";
import Layout from "./layout";
describe('Layout', () => {
  describe('navigation links', () => {

    beforeEach(() => {
      render(<Layout />)
    });
    test('renders three links', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(3);
    });

    test('renders a link to "/"', () => {
      const links = screen.getAllByRole('link');
      const expected = links.find((l) => {
        return l.getAttribute('href') === '/';
      });
      expect(expected).toBeTruthy();
    });

    test('renders a link to "/posts"', () => {
      const links = screen.getAllByRole('link');
      const expected = links.find((l) => {
        return l.getAttribute('href') === '/posts';
      });
      expect(expected).toBeTruthy();
    });

    test('renders a link to "/contact"', () => {
      const links = screen.getAllByRole('link');
      const expected = links.find((l) => {
        return l.getAttribute('href') === '/contact';
      });
      expect(expected).toBeTruthy();
    });
  });

  describe('renders children', () => {
    test('renders a child header element', () => {
      render(<Layout><h1>
          My header
        </h1></Layout>);
      const expected = screen.getByRole('heading', { name: /my header/i});
      expect(expected).toBeInTheDocument();
    });

    test('renders a child list', () => {
      render(
        <Layout>
          <ul>
            <li>first</li>
            <li>second</li>
          </ul>
        </Layout>
      );
      const expected = screen.getAllByRole('list');
      expect(expected.length).toBe(2);
    });
  })
  
});