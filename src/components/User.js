import { useState } from "react";
const User = (props) => {
  const [count] = useState(0);
  const [count1] = useState(1);
  return (
    <div>
      <h4>Name:{props.name}</h4>
      <h4>count:{count}</h4>
      <h4>count1:{count1}</h4>
    </div>
  );
};
export default User;
