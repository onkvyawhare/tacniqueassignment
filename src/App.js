import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Notification from "./components/Notification";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Notification />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <AddUser />
              <Notification />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <EditUser />
              <Notification />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;