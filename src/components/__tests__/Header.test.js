import { Header } from "../Header";
import { BrowserRouter } from "react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/redux/appStore";
import "@testing-library/jest-dom";
test("Should have login button when the component renders", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const button = screen.getByRole("button", { name: "Login" });
  expect(button).toBeInTheDocument();
});

test("should display Logout when i click login", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const button = screen.getByRole("button", { name: "Login" });
  fireEvent.click(button);
  const text = screen.getByRole("button", { name: "Logout" });
  expect(text).toBeInTheDocument();
});
