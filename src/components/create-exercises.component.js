// Import necessary libraries and modules
import React, { Component } from 'react';
import axios from 'axios';

// Define a class component named CreateExercise
export default class CreateExercise extends Component {
  // Constructor method that initializes the component's state and binds event handler methods
  constructor(props) {
    super(props);

    // Bind event handler methods to the component's instance
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Initialize the component's state
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date().toISOString().split('T')[0], // Initialize date as a string in "YYYY-MM-DD" format
      users: [] // An array to store user data
    };
  }

  // Component lifecycle method, called after the component is mounted
  componentDidMount() {
    // Fetch user data from a local server using Axios
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          // Update the component's state with the fetched user data
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username // Optionally, set a default username
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Event handler methods to update the component's state when input fields change
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  // Event handler for form submission
  onSubmit(e) {
    e.preventDefault();

    // Create an object to represent an exercise
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    // Log the exercise data
    console.log(exercise);

    // Send a POST request to add the exercise to the server
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    // Redirect to the home page
    window.location = '/';
  }

  // Render method to display the form and UI
  render() {
    return (
        <div>
          <h3>Create New Exercise Log</h3>
          <form onSubmit={this.onSubmit}>
            {/* Form elements for entering exercise data */}
            <div className="form-group">
              <label>Username: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              >
                {/* Map and display a list of users as dropdown options */}
                {this.state.users.map(function(user) {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                type="text"
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
              />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <input
                type="date" // Use HTML5 date input type
                className="form-control"
                value={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
    );
  }
}
