const RestaurantCard = (props) => {
  return (
    <div className="w-72 m-9 p-2" data-testid="resId">
      <div className="flex items-center justify-center">
        <img
          className="w-72 h-56 rounded-md"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${props.info.cloudinaryImageId}`}
        />
      </div>
      <h3>{props.info.name}</h3>
      <h4>{props.info.cuisines.join(", ")}</h4>
      <h4>{props.info.avgRating}</h4>
      <h4>{props.info.costForTwo}</h4>
      <h4>{props.info.sla.deliveryTime + "mins"}</h4>
    </div>
  );
};

export const WithLabelRestaurantCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-green-400 text-white p-1 m-1">
          Opened
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
export default RestaurantCard;
