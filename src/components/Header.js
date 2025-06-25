import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router";
import useCheckOnline from "../utils/useCheckOnline";
import UserContext from "../utils/UserContext";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Header = () => {
  const [buttonText, setButtonText] = useState("Login");
  const onlineStatus = useCheckOnline();
  const { loginedUser } = useContext(UserContext);
  const items = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-between items-center bg-sky-100 p-5">
      <div className="w-24">
        <img src={LOGO_URL} className="rounded-full" />
      </div>
      <div>
        <ul className="flex">
          <li className="pl-4">{onlineStatus ? "💚" : "❤️"}</li>
          <li className="pl-4">
            <Link to="/" className="font-bold text-lg">
              Home
            </Link>
          </li>
          <li className="pl-4">
            <Link to="/about" className="font-bold text-lg">
              AboutUs
            </Link>
          </li>
          <li className="pl-4">
            <Link to="/contact" className="font-bold text-lg">
              ContactUs
            </Link>
          </li>
          <li className="pl-4">
            <Link
              to="/cart"
              className="font-bold text-lg relative w-20 flex flex-col"
            >
              <FaShoppingCart size={25} />
              {/* {items.length>0 && <span className="flex text-center bg-red-600 text-white -top-8 rounded-full">{items.length}</span>} */}
              {items.length > 0 && (
                <span
                  data-testid="cartCount"
                  className="absolute flex w-6 h-6 text-sm items-center justify-center left-3 -top-4 bg-red-600 text-white  rounded-full"
                >
                  {items.length}
                </span>
              )}
            </Link>
          </li>
          <li className="font-bold text-lg">
            <button
              className="login-btn"
              onClick={() => {
                buttonText == "Login"
                  ? setButtonText("Logout")
                  : setButtonText("Login");
              }}
            >
              {buttonText}
            </button>
          </li>
          <li className="pl-4 font-bold text-lg font-sans">{loginedUser}</li>
        </ul>
      </div>
    </div>
  );
};
