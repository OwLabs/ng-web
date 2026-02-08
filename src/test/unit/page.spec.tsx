import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page Unit Tests", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("displays the main heading", () => {
    render(<Home />);
    expect(
      screen.getByText(/To get started, edit the page.tsx file/i),
    ).toBeInTheDocument();
  });

  it("has Deploy Now button", () => {
    render(<Home />);
    const deployLink = screen.getByRole("link", { name: /Deploy Now/i });
    expect(deployLink).toBeInTheDocument();
    expect(deployLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/new"),
    );
  });

  it("has Documentation link", () => {
    render(<Home />);
    const docsLink = screen.getByRole("link", { name: /Documentation/i });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute(
      "href",
      expect.stringContaining("nextjs.org/docs"),
    );
  });

  it("renders Next.js logo", () => {
    render(<Home />);
    const logo = screen.getByAltText(/Next.js logo/i);
    expect(logo).toBeInTheDocument();
  });
});
