import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercises-list.component';
import EditExercises from './components/edit-exercise.component';
import CreateUser from './components/create-user.component';
import CreateExercises from './components/create-exercises.component'; // Import named exports


function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <Navbar />
      <br />
      <Routes>
        
  <Route path="/" Component={ExerciseList} />
  <Route path="/edit/:id" Component={EditExercises} />
  <Route path="/create" Component={CreateExercises} />
  <Route path="/user" Component={CreateUser} />
</Routes>

</div>
    </BrowserRouter>
  );
}


export default App;
