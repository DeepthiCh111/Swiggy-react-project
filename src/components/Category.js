import { useState } from "react";
import ItemCard from "../components/ItemCard";
const Category = ({ category, change, setShowIndex }) => {
  const items = category?.itemCards;
  // console.log(items);

  // const handleClick = () => {
  //   return setChange(!change);
  // };
  return (
    <div>
      <div
        className="flex justify-between shadow-md p-4"
        onClick={() => {
          setShowIndex();
        }}
      >
        <p data-testid="titleId" className="text-stone-950 font-bold text-xl">
          {category.title}
        </p>
        <span className="text-gray-500 font-bold text-md">
          {change ? "▲" : "▼"}
        </span>
      </div>
      <div>
        {change &&
          items.map((res) => <ItemCard key={res?.card?.info?.id} item={res} />)}
      </div>
      <div className="bg-gray-200 p-2"></div>
    </div>
  );
};
export default Category;
