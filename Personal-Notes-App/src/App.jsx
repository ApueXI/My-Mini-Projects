import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NotesList from "./Pages/NotesList";
import NavBar from "./Components/NavBar";
import ViewNotes from "./Pages/ViewNotes";

function App() {
    return (
        <>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/individual/:id" element={<ViewNotes />} />
            </Routes>
        </>
    );
}

export default App;
