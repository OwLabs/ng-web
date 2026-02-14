import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page Unit Tests", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("displays the welcome header", () => {
    render(<Home />);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it("displays the AI insight section", () => {
    render(<Home />);
    expect(screen.getByText(/ai insight/i)).toBeInTheDocument();
  });

  it("displays the learning journey subtitle", () => {
    render(<Home />);
    expect(screen.getByText(/learning journey/i)).toBeInTheDocument();
  });
});
