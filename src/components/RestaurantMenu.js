import { useParams } from "react-router";
import { Link, useState } from "react";
import useRestaurantCustomHook from "../utils/useRestaurantCustomHook";
import Category from "../components/Category";
const RestaurantMenu = () => {
  // let [menuData, setMenuData] = useState();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  // const data = await fetch(
  //   `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=16.5419292&lng=80.8050141000001&restaurantId=${resId}`
  // );

  // const json = await data.json();
  // console.log(json?.data);
  //   setMenuData(json?.data);
  // };

  const { resId } = useParams();

  const menuData = useRestaurantCustomHook(resId);
  const dataa = menuData?.cards[2]?.card?.card?.info;

  const [showIndex, setShowIndex] = useState();

  const categoryData =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.filter(
        (res) =>
          res?.card?.card?.["@type"] ==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
      ?.map((res) => res?.card?.card);
  console.log(categoryData);
  return (
    <div className="w-8/12  mx-auto p-14">
      <h1 className="font-bold text-[32px]">
        {menuData?.cards[0]?.card?.card?.text}
      </h1>
      <div className="mt-4 p-4 rounded-xl border shadow-lg border-slate-200  shadow-gray-500 bg-white">
        <p className="font-bold text-[19px] mb-1">
          {"⭐" +
            dataa?.avgRatingString +
            "(" +
            dataa?.totalRatingsString +
            ")" +
            "  " +
            "  • " +
            dataa?.costForTwoMessage}
        </p>
        <p className="text-red-500 font-bold">{dataa?.cuisines}</p>

        <div>
          <ul className="m-3">
            <li className="list-disc text-gray-400">
              <p className="text-black font-bold">
                Outlet
                <span className="font-normal ml-3">{dataa?.areaName}🔻</span>
              </p>
            </li>
            <li className="list-disc text-gray-400">
              <p className="text-black font-bold">{dataa?.sla?.slaString}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 ">
        <h1 className="font-bold text-[22px]">Deals for you</h1>
        <div className="flex p-4 overflow-x-auto">
          {menuData?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers.map(
            (offer) => {
              return <Offer key={offer.info.offerIds[0]} {...offer} />;
            }
          )}
        </div>
      </div>
      <h2 className="text-[17] font-serif font-bold text-gray-500 mt-14 mb-8 ml-[400]">
        ❁ MENU ❁
      </h2>

      {categoryData?.map((res, index) => (
        <Category
          key={res.categoryId}
          category={res}
          change={index == showIndex ? true : false}
          setShowIndex={() => {
            setShowIndex(index == showIndex ? null : index);
          }}
        />
      ))}
    </div>
  );
};
const Offer = (props) => {
  return (
    <div className="min-w-[400px] flex h-20 mr-5 rounded-2xl p-4 border border-slate-300">
      <img
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${props.info.offerLogo}`}
        className="w-15 mr-3"
      />
      <div>
        <h3 className="font-bold text-[18px]">{props.info.header}</h3>
        <p className="font-bold text-gray-400 text-[18px]">
          {props.info.primaryDescription
            ? props.info.primaryDescription
            : props.info.expiryTime}
        </p>
      </div>
    </div>
  );
};

export default RestaurantMenu;
