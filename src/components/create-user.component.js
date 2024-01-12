import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    // Binding functions to this component's context
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Initializing the component's state
    this.state = {
      username: ''
    }
  }

  // Function to handle changes in the username input field
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  // Function to handle form submission
  onSubmit(e) {
    e.preventDefault();

    // Creating a user object with the current username
    const user = {
      username: this.state.username
    }

    console.log(user);

    // Sending a POST request to the server to add the user
    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    // Resetting the username field after submission
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input
                type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
