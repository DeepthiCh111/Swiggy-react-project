import ContactUs from "../ContactUs";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
test("Should render contact us component", () => {
  render(<ContactUs />);

  const result = screen.getByRole("heading");

  expect(result).toBeInTheDocument();
});
