import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotesList from "./Pages/NotesList";
import NavBar from "./Components/NavBar";

function App() {
    return (
        <>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/notes/:id" element={<NotesList />} />{" "}
                {/* dipa to tapos */}
            </Routes>
        </>
    );
}

export default App;
