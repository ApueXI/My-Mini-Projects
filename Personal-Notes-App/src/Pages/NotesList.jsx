import { Link } from "react-router-dom";
import styles from "../CSS/NotesList.module.css";

export default function NotesList() {
    return (
        <div className={styles.body}>
            <div className={styles.titleBG}>
                <h1 className={styles.title}>Notes List</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.notesBG}>
                    <ul className={styles.notesContainer}>
                        <li>Game for 3 Hours</li>
                        <li>Sleep for 8 Hours</li>
                        <li>Eat for 1 Hours</li>
                        <li>Rest for 3 Hours</li>
                        <li>Game for 3 Hours</li>
                        <li>Sleep for 8 Hours</li>
                        <li>Eat for 1 Hours</li>
                        <li>Rest for 3 Hours</li>
                        <li>Game for 3 Hours</li>
                        <li>Sleep for 8 Hours</li>
                        <li>Eat for 1 Hours</li>
                        <li>Rest for 3 Hours</li>
                    </ul>
                    <Link to="/" className={styles.backBtn}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ┌────────────────────────────────────┐
// │           📒 All Notes             │
// │                                    │
// │  ▸ Shopping List                   │  ← Link to /notes/1
// │  ▸ Project Ideas                   │  ← Link to /notes/2
// │  ▸ Books to Read                   │  ← Link to /notes/3
// │                                    │
// │   [ Add New Note ]  [ ⬅ Back ]    │
// └────────────────────────────────────┘
