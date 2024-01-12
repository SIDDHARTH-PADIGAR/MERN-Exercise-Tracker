// Import necessary libraries and modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Functional component Exercise to display individual exercise items in the list
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>  
    <td>{props.exercise.description}</td> 
    <td>{props.exercise.duration}</td> 
    <td>{props.exercise.date.substring(0, 10)}</td> 
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> | {/* Link to edit the exercise */}
      <a href='#' onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a> {/* Delete exercise */}
    </td>
  </tr>
)

// Class component ExercisesList to display a list of exercises
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    // Bind the deleteExercise method to the component's instance
    this.deleteExercise = this.deleteExercise.bind(this)

    // Initialize the component's state with an empty array for exercises
    this.state = { exercises: [] };
  }

  // Component lifecycle method, called after the component is mounted
  componentDidMount() {
    // Fetch a list of exercises from the server using Axios
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        // Update the component's state with the fetched exercises
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Method to delete an exercise
  deleteExercise(id) {
    // Send a DELETE request to the server to delete the exercise
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(response => { console.log(response.data) });

    // Update the component's state to remove the deleted exercise from the list
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  // Method to generate a list of Exercise components based on the current state
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    })
  }

  // Render method to display the list of exercises in a table
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()} {/* Render the list of exercises */}
          </tbody>
        </table>
      </div>
    )
  }
}
