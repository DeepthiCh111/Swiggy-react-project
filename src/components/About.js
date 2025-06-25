import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";
// const About = () => {
//   return (
//     <div>
//       <h1>AboutUs</h1>
//       <User name="Deepthi from function" />
//       <UserClass name="Deepthi from class" />
//     </div>
//   );
// };

class About extends Component {
  constructor(props) {
    super(props);
    console.log("About class Called");
  }
  render() {
    console.log("About class rendered");
    return (
      <div>
        <h1>AboutUs</h1>
        <UserContext.Consumer>
          {({ loginedUser }) => <h1>{loginedUser}</h1>}
        </UserContext.Consumer>
        <User name="Deepthi from function" />
        <UserClass name="Deepthi from class" />
      </div>
    );
  }

  componentDidMount() {
    console.log("About Class Mounted");
  }
}

export default About;
