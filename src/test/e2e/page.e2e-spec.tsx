import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page E2E Tests", () => {
  it("page loads successfully", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("displays main content", () => {
    render(<Home />);
    expect(
      screen.getByText(/To get started, edit the page.tsx file/i),
    ).toBeInTheDocument();
  });

  it("has working navigation links", () => {
    render(<Home />);
    const deployLink = screen.getByRole("link", { name: /Deploy Now/i });
    const docsLink = screen.getByRole("link", { name: /Documentation/i });

    expect(deployLink).toHaveAttribute("target", "_blank");
    expect(docsLink).toHaveAttribute("target", "_blank");
  });

  it("renders visual elements", () => {
    render(<Home />);
    const logo = screen.getByAltText(/Next.js logo/i);
    const vercelLogo = screen.getByAltText(/Vercel logomark/i);

    expect(logo).toBeInTheDocument();
    expect(vercelLogo).toBeInTheDocument();
  });
});
