import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page Unit Tests", () => {
  it("renders without crashing", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
