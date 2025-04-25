import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddEditTodo from './pages/AddEditTodo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditTodo />} />
        <Route path="/edit/:id" element={<AddEditTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
