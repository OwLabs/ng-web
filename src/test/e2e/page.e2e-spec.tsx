import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page E2E Tests", () => {
  it("page loads successfully", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
