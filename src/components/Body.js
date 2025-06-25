import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/data";
import { useContext, useEffect, useState } from "react";
import { ShimmerUi } from "./ShimmerUi";
import { Link } from "react-router";
import UseCheckOnline from "../utils/useCheckOnline";
import { WithLabelRestaurantCard } from "../components/RestaurantCard";
import UserContext from "../utils/UserContext";
const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const onlineStatus = UseCheckOnline();
  const LabeledRestaurantCard = WithLabelRestaurantCard(RestaurantCard);
  const { loginedUser, setUsername } = useContext(UserContext);

  console.log("Body rendered");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.5241021&lng=80.7903578&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    console.log(json);
    setListOfRes(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredList(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (onlineStatus == false) return <div>oops!</div>;

  return !listOfRes || listOfRes.length === 0 ? (
    <ShimmerUi />
  ) : (
    <div className="body">
      <div className="flex items-center justify-between m-5">
        <button
          className="bg-slate-200 p-3 mx-10 rounded-md"
          onClick={() => {
            const filtered = listOfRes.filter((res) => res.info.avgRating > 4);
            setFilteredList(filtered);
          }}
        >
          FilterTopRatings
        </button>
        <input
          type="text"
          placeholder="Search here"
          className="p-2 w-[500] focus:outline-slate-200"
          id="price-input"
          data-testid="inputId"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="bg-pink-100 p-[9] w-[100] rounded-tr-lg rounded-br-lg"
          onClick={() => {
            const filtered = listOfRes.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredList(filtered);
          }}
        >
          Search
        </button>

        <input
          type="text"
          data-testid="usernameId"
          className="p-2 w-[500] border border-slate-400 focus:outline-slate-200"
          placeholder="enter username"
          value={loginedUser}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {filteredList.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
            {res.info.isOpen ? (
              <LabeledRestaurantCard {...res} />
            ) : (
              <RestaurantCard {...res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
