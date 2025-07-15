import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SoloNote from "../Components/SoloNote";

export default function ViewNotes() {
    const location = useLocation();
    const { id } = useParams();

    const [note, setNote] = useState(location.state?.data || null);
    const [loading, setLoading] = useState(!note);

    useEffect(() => {
        if (!note) {
            const storedNote = localStorage.getItem("notes");
            if (storedNote) {
                const allNotes = JSON.parse(storedNote);
                const foundNote = allNotes.find((n) => id == n.idData);

                setNote(foundNote || null);
            } else {
                setNote(null);
            }
            setLoading(false);
        }
        console.log(note);
    }, [id]);

    if (loading) {
        return <div>Loading Notes...</div>;
    }

    const noteFound = (
        <div
            style={{
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SoloNote data={note}></SoloNote>;
        </div>
    );  

    const notesNotFound = (
        <div>
            <div>
                <h1>Note not found for ID: {id}</h1>
                <Link to="/">Go Back</Link>
            </div>
        </div>
    );

    return note ? noteFound : notesNotFound;
}
