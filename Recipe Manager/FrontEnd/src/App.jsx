import "./main.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

// ---------------------------------------------------
// | LOGO / Recipe Manager           [Add Recipe +]  |
// ---------------------------------------------------
// | [ Search Bar ] [ Filter Dropdown ]             |
// ---------------------------------------------------
// |  Recipe Card  |  Recipe Card  |  Recipe Card    |
// |  - Image      |  - Image      |  - Image        |
// |  - Title      |  - Title      |  - Title        |
// |  - Short Desc |  - Short Desc |  - Short Desc   |
// |  [View]       |  [View]       |  [View]         |
// ---------------------------------------------------
// | Pagination (if many recipes)                   |
// ---------------------------------------------------

// ---------------------------------------------------
// | [Back]                                         |
// | Recipe Title                                   |
// | [Image]                                        |
// | Ingredients (List)                             |
// | Instructions (Paragraphs/Steps)                |
// | [Edit]  [Delete]                               |
// ---------------------------------------------------

// ---------------------------------------------------
// | [Back]                                         |
// | Recipe Form                                    |
// | - Title                                        |
// | - Image URL                                    |
// | - Ingredients (textarea or multi-field)        |
// | - Instructions (textarea)                      |
// | [Save Recipe]                                  |
// ---------------------------------------------------
