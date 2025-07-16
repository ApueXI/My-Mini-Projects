import styles from "../CSS/SoloNote.module.css";
import { Link } from "react-router-dom";

export default function SoloNote({ data }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.noteText}>Note Details</h1>
            <h1 className={styles.title}>{data.titleData}</h1>
            <p className={styles.content}>{data.contentData}</p>
            <Link to="/notes" className={styles.link}>
                Go back
            </Link>
        </div>
    );
}

// ┌────────────────────────────────────┐
// │           📝 Note Details          │
// │                                    │
// │  📌 Title: Shopping List           │
// │                                    │
// │  • Milk                            │
// │  • Bread                           │
// │  • Eggs                            │
// │                                    │
// │  [ ⬅ Back to All Notes ]           │
// └────────────────────────────────────┘
