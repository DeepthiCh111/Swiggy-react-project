import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count1: 1,
    };
    console.log("user class called");
  }
  render() {
    const { name } = this.props;
    console.log("user class rendered");

    return (
      <div>
        <h1>Name:{name}</h1>
        <h1>Count:{this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          IncreaseCount
        </button>
      </div>
    );
  }

  componentDidMount() {
    console.log("User class mounted");
  }
}
export default UserClass;
