import { Link } from "react-router-dom";

export default function AddNotes() {
    return (
        <div>
            <h1>From add Notes</h1>
            <Link to="/" className="backBtn">
                Back to Home
            </Link>
        </div>
    );
}
