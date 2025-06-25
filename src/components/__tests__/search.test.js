import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import { act, useState } from "react";
import MOCK_DATA from "../mocks/bodymocks.json";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import { Header } from "../Header";
import UserContext from "../../utils/UserContext";
import appStore from "../../utils/redux/appStore";
import { Provider } from "react-redux";
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

test("Should work for search component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const cards = screen.getAllByTestId("resId");
  expect(cards.length).toBe(8);
  const search = screen.getByRole("button", { name: "Search" });
  const input = screen.getByTestId("inputId");

  fireEvent.change(input, { target: { value: "pizza" } });
  fireEvent.click(search);
  const cardsAfter = screen.getAllByTestId("resId");
  expect(cardsAfter.length).toBe(1);
});

test("Should work for topRated restaurants", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const beforeCards = screen.getAllByTestId("resId");
  expect(beforeCards.length).toBe(8);

  const topRatedButton = screen.getByRole("button", {
    name: "FilterTopRatings",
  });
  fireEvent.click(topRatedButton);
  const afterCards = screen.getAllByTestId("resId");
  expect(afterCards.length).toBe(8);
});

test("Should update header username when the user types username", async () => {
  const Wrapper = () => {
    const [username, setUsername] = useState("Deepthi");
    return (
      <BrowserRouter>
        <Provider store={appStore}>
          <UserContext.Provider value={{ loginedUser: username, setUsername }}>
            <Header />
            <Body />
          </UserContext.Provider>
        </Provider>
      </BrowserRouter>
    );
  };
  await act(async () => render(<Wrapper />));

  const text = screen.getByText("Deepthi");
  expect(text).toBeInTheDocument();

  const usernameInput = screen.getByTestId("usernameId");
  fireEvent.change(usernameInput, { target: { value: "Lahari" } });

  const text2 = screen.getByText("Lahari");
  expect(text2).toBeInTheDocument();
});
