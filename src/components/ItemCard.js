import { IMAGE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/redux/cartSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    console.log("items in dispatcher");
    console.log(item);
    dispatch(addItem(item));
  };
  console.log("items");
  console.log(item);
  return (
    <div
      className="flex justify-between border-b-2 border-b-slate-300 my-5 mx-3 pb-2"
      data-testid="foodItems"
    >
      <div className="bg-gray-300 w-9/12">
        <p className="font-bold text-gray-800">{item?.card?.info?.name}</p>
        <p className="font-bold text-gray-600 my-2 ">
          ₹{item?.card?.info?.price / 100}
        </p>
        <p className="font-bold text-green-800">
          {item?.card?.info?.ratings?.aggregatedRating?.rating ? (
            "⭐" +
            item?.card?.info?.ratings?.aggregatedRating?.rating +
            "(" +
            item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 +
            ")"
          ) : (
            <br></br>
          )}
        </p>
        <p>{item?.card?.info?.description}</p>
      </div>
      <div className="w-3/12 bg-red-200 h-60">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.card?.info?.imageId}`}
          className="w-[180] m-2"
        />
        <button
          className="absolute rounded-lg p-2  w-20 bg-gray-600 text-white font-bold"
          onClick={() => handleClick(item)}
        >
          Add+
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
