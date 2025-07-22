import "./main.css";
import Home from "./Pages/Home";
import ViewRecipe from "./Pages/ViewRecipe";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* :id means that it can receive a data in the id variable */}
            <Route path="/view/:id" element={<ViewRecipe />} />
        </Routes>
    );
}
