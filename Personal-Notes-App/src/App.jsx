import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotesList from "./Pages/NotesList";
import AddNotes from "./Pages/AddNotes";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/add" element={<AddNotes />} />
        </Routes>
    );
}

export default App;
