import { Component, Fragment } from "react";
import UsersContext from "../store/users-context";
import ErrorBoundaries from "./ErrorBoundaries";
import classes from "./UserFinder.module.css";

import Users from "./Users";

class UserFinder extends Component {
  static contextType = UsersContext;
  constructor() {
    super();
    this.state = { filteredUsers: [], searchTerm: "" };
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
  }
  searchChangeHandler = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  componentDidMount() {
    // send my http request ...
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(preProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm)
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        )
      });
  }

  com;

  render() {
    return (
      <Fragment>
        <input
          className={classes.finder}
          type="search"
          onChange={this.searchChangeHandler}
        />
        <ErrorBoundaries>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundaries>
      </Fragment>
    );
  }
}

/* const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <input
        className={classes.finder}
        type="search"
        onChange={searchChangeHandler}
      />
      <Users users={filteredUsers} />
    </Fragment>
  );
}; */

export default UserFinder;
