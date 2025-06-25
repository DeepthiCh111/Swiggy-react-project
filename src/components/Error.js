import { useRouteError } from "react-router";
const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <p>{err.status}</p>
    </div>
  );
};

export default Error;
