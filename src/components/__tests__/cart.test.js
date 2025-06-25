import Cart from "../Cart";
import { Header } from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import appStore from "../../utils/redux/appStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import Mock_data from "../../components/mocks/cartMocks.json";
import { act } from "react";
import { SiExpertsexchange } from "react-icons/si";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(Mock_data);
    },
  });
});

test("Should render cart component", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    )
  );
  const accordian = screen.getByText("Veg Pizza");
  fireEvent.click(accordian);
  const cards = screen.getAllByTestId("foodItems");
  expect(cards.length).toBe(13);
  const buttons = screen.getAllByRole("button", { name: "Add+" });
  fireEvent.click(buttons[0]);
  const cartCount = screen.getByTestId("cartCount");
  expect(cartCount.textContent).toBe("1");
});
