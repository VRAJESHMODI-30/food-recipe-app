import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyRecipe from "./components/MyRecipe";
import FoodItem from "./components/FoodItem";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="myrecipe" element={<MyRecipe />} />
            <Route path="fooditem" element={<FoodItem />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
export default App;
