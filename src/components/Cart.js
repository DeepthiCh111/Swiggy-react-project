import { useSelector, useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import { clearCart } from "../utils/redux/cartSlice";
const Cart = () => {
  const items = useSelector((store) => store.cart.items);
  console.log("items in cart");
  const dispatch = useDispatch();
  console.log(items);

  const handleClick = () => {
    dispatch(clearCart());
  };
  return (
    <div className="w-8/12 m-auto">
      <div className="flex align-center justify-between">
        <h1 className=" ml-2 mt-7 font-serif font-extrabold text-3xl">
          Cart👉🏽
        </h1>
        <button
          className="bg-gray-200 rounded-xl border border-slate-600 border-doub  w-[100] mr-5 mt-7 font-serif font-bold text-lg"
          onClick={() => handleClick()}
        >
          Clear
        </button>
      </div>

      <div>
        {items.length > 0 ? (
          items.map((res) => <ItemCard key={res?.card?.info?.id} item={res} />)
        ) : (
          <marquee className="mt-20 bg-amber-200 text-xl p-3 font-bold">
            Cart is empty!! Add items to the cart!! &nbsp;&nbsp; &nbsp; &nbsp;
            Cart is empty!! Add items to the cart!! &nbsp; &nbsp; &nbsp; Cart is
            empty!! Add items to the cart!!
          </marquee>
        )}
      </div>
    </div>
  );
};
export default Cart;
