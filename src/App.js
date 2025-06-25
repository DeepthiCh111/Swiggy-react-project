import { React, lazy, Suspense, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Header"; /* importing by named export */
import Body from "./components/Body"; //importing by default export (default ca only work for one in a group)
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
// import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import appStore from "./utils/redux/appStore";
import { Provider } from "react-redux";
import Cart from "./components/Cart";

/*
--- body
    |
    ---nav section(logo,navitems)
    ---body(serach, restaurant container(cards))
    ---footer
*/

// const resObj = {
//   id: 1,
//   restaurantName: "Pizza Paradise",
//   price: 299,
//   avgRating: 4.2,
//   cuisines: ["Italian", "Vegetarian"],
//   image: "https://images.unsplash.com/photo-1601924582975-4cc9f231ed6a",
// };

// const RestaurantCard = ({
//   restaurantName,
//   cuisines,
//   avgRating,
//   price,
//   image,
// }) => {
//   // const { restaurantName, cuisines, avgRating, price, image } = prop;
//   return (
//     <div className="res-Card">
//       <div className="img-container">
//         <img src={image} />
//       </div>
//       <h3>{restaurantName}</h3>
//       <h4>{cuisines}</h4>
//       <h4>{avgRating}</h4>
//       <h4>{price}</h4>
//       <h4>38 minutes</h4>
//     </div>
//   );
// };

// const AppLayOut = () => {
//   return (
//     <div className="app">
//       <Header />
//       <div>Search</div>
//       <div className="res-container">
//         <RestaurantCard {...resObj} />
//       </div>
//     </div>
//   );
// };
const About = lazy(() => import("./components/About"));

const AppLayOut = () => {
  const [username, setUsername] = useState();
  useEffect(() => {
    const data = {
      name: "Deepthi",
    };
    console.log(data.name);
    setUsername(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loginedUser: username, setUsername }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Fallback</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
