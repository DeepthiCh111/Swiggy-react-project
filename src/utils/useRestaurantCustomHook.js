import { useState, useEffect } from "react";

const useRestaurantCustomHook = (resId) => {
  const [resInfo, setResInfo] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=16.5419292&lng=80.80501410000001&restaurantId=${resId}`
    );

    const json = await data.json();
    setResInfo(json?.data);
  };
  return resInfo;
};
export default useRestaurantCustomHook;
